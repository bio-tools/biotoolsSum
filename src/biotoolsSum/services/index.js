import config from '../common/config'
import * as R from 'ramda'
import * as Rx from 'rxjs'
import {MAX_ROW_CELLS_COUNT} from '../../constants/toolsTable'
import {impacts} from "../common/helperFunctions";

export const pickData = R.map(
  R.compose(
    R.evolve(
      {
        // function: R.compose(R.prop('operation'), R.head),
        pmids: R.reject(R.isNil),
        credit: R.filter(R.propEq('typeEntity', 'Institute')),
      }),
    R.pick([
      'id',
      'name',
      'homepage',
      'version',
      'description',
      'topic',
      'maturity',
      'operatingSystem',
      'function',
      'toolType',
      'citations',
      'citationsYears',
      'publication',
      'pmids',
      'credit',
      'publicationsStrings',
      'publicationsIdSourcePairs',
      'license',
      'documentation'
    ]),
    R.converge(R.assoc('id'), [R.prop('biotoolsID'), R.identity])
  )
)

const getPublicationsInfo = uniquePublications => uniquePublications.map(pub => {
  let id = ''
  if (pub.doi !== null) {
    id = pub.doi.startsWith('doi') ? pub.doi : `doi:${pub.doi}`
  } else if (pub.pmid !== null) {
    id = pub.pmid
  } else if (pub.pmcid !== null) {
    id = pub.pmcid
  } else {
    return Rx.Observable.of(null)
  }

  return Rx.Observable.fromPromise(fetch(config.getPublicationInfoApiUrl(id))
    .then(response => response.json())
    .then(publicationInfo => {
      const result = publicationInfo.resultList.result[0]
      if (!result) {
        return null
      }
      const {source, id: resultId, citedByCount} = result
      const pages = Math.ceil(citedByCount / 1000)

      let apiPromises = []
      for (let i = 1; i <= pages; i++) {
        apiPromises.push(
          fetch(config.getCitationsApiUrl(source, resultId, i)).then(response => response.json())
        )
      }

      return Promise.all(apiPromises).then(citationsInfo => {
        const citationsYears = citationsInfo.length > 0
          ? R.compose(
            R.map(R.length),
            R.groupBy(R.identity),
            R.pluck('pubYear'),
            R.flatten,
            R.pluck('citation'),
            R.pluck('citationList'),
          )(citationsInfo)
          : {}

        return ({publicationInfo, citationsYears})
      })
    })
  )
})

export const updatedData = tools => {
  if (tools.length === 0) {
    return Rx.Observable.of([])
  }

  return tools.map(tool => {
    const {publication} = tool

    if (publication.length === 0) {
      return Rx.Observable.of(R.compose(
        R.assoc('publicationsIdSourcePairs', []),
        R.assoc('citations', 0),
      )(tool))
    }

    // There were occasionally duplicates in the publications record
    const uniquePublications = R.uniqBy(R.props(['doi', 'pmid', 'pmcid']), publication)

    return Rx.Observable
      .combineLatest(getPublicationsInfo(uniquePublications))
      .map(publicationsInfo => {
        const pickedPublicationsInfo = publicationsInfo === null
          ? null
          : R.compose(
            R.map(R.props(['authorString', 'title', 'journalTitle', 'pubYear', 'pageInfo', 'id', 'source', 'citedByCount'])),
            R.filter(info => info !== undefined),
            R.pluck(0),
            R.pluck('result'),
            R.pluck('resultList'),
            R.pluck('publicationInfo')
          )(publicationsInfo)

        let citationsYears = {}
        let citations = 0
        let publicationsStrings = []
        let publicationsIdSourcePairs = []

        if (pickedPublicationsInfo) {
          publicationsStrings = R.compose(
            R.map(R.join(', ')),
            R.map(R.props([0, 1, 2, 3, 4])),
          )(pickedPublicationsInfo)

          publicationsIdSourcePairs = R.map(R.props([5, 6]), pickedPublicationsInfo)

          citations = R.compose(
            R.sum,
            R.pluck(7),
          )(pickedPublicationsInfo)

          citationsYears = R.compose(
            R.pluck('citationsYears'),
          )(publicationsInfo)
        }

        return R.compose(
          R.assoc('citations', citations),
          R.assoc('citationsYears', citationsYears),
          R.assoc('publicationsStrings', publicationsStrings),
          R.evolve({
            publication: R.compose(
              publication => publication.map((publication, index) =>
                R.compose(
                  R.assoc('impact', impacts[publication.metadata.journal.toUpperCase()]),
                  R.assoc('publicationIdSourcePair', publicationsIdSourcePairs[index]),
                )(publication)
              ),
              R.filter(publication => publication.doi !== null || publication.pmid !== null || publication.pmcid !== null),
            ),
          })
        )(tool)
      })
  })
}

export function getServices(query, page = '?page=1') {
  if (query.constructor === Array && query.length > 0) {
    const url = config.getBioToolsApiUrl(`${page}&${query[0]}`)
    query = query.slice(1)
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (query.length > 0) {
          return getServices(query)
            .then(nextData =>
              R.evolve({
                list: R.concat(nextData.list),
                count: R.add(nextData.list.length)
              }, data)
            )
        }
        return data
      })
  }
  const url = config.getBioToolsApiUrl(`${page}&${query}`)
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.next !== null) {
        return getServices(query, data.next)
          .then(nextData =>
            R.evolve({
              list: R.concat(nextData.list),
            }, data)
          )
      }
      return data
    })
}

export function getCellsCount(includePropsChosen) {
  if (includePropsChosen === undefined) {
    return MAX_ROW_CELLS_COUNT
  }

  let count = 1
  let checked = []

  includePropsChosen.forEach(prop => {
    if (prop !== 'toolType') {
      if (prop === 'publication' || prop === 'citations') {
        !R.contains('publication', checked) && !R.contains('citations', checked) && count++
        checked.push(prop)
      } else if (prop === 'maturity' || prop === 'platform') {
        !R.contains('maturity', checked) && !R.contains('platform', checked) && count++
        checked.push(prop)
      } else {
        count++
        checked.push(prop)
      }
    }
  })

  return count
}

export function orderByAttributeAndTakeFirstX(list, sortBy, order, takeFirstX) {
  return R.compose(
    R.take(takeFirstX),
    R.sort(order === 'ascend'
      ? R.ascend(R.prop(sortBy))
      : R.descend(R.prop(sortBy)),
      R.__),
  )(list)
}

export function getChartConfig(citationsYears, toolName, seriesNames) {
  const allCitationsYears = R.reduce(R.mergeWith(R.add), 0, citationsYears)

  let years = R.keys(allCitationsYears)

  for (let i = 1; i < years.length; i++) {
    if (years[i] - years[i - 1] !== 1) {
      years = R.insert(i, (Number(years[i - 1]) + 1).toString(), years)
    }
  }

  let data = []
  if (citationsYears.length > 1) {
    data = R.compose(
      R.map(R.objOf('data')),
      R.map(R.values),
      R.map(obj => {
        let newObj = obj
        R.forEach(year => {
          if (!R.has(year, obj)) newObj[year] = 0
        }, years)
        return newObj
      }),
    )(citationsYears)

    if (seriesNames) {
      for (let i = 0; i < data.length; i++) {
        data[i].name = seriesNames[i]
      }
    }
  }

  const totalNumberOfCitations = R.compose(
    R.values,
    obj => {
      let newObj = obj
      R.forEach(year => {
        if (!R.has(year, obj)) newObj[year] = 0
      }, years)
      return newObj
    },
  )(allCitationsYears)

  const series = R.compose(
    R.map(R.assoc('maxPointWidth', 40), R.__),
    R.concat(R.__, [{
      name: `Total number of citations`,
      data: totalNumberOfCitations,
    }]),
  )(data)

  return {
    title: {
      text: `Citations for ${toolName}`,
    },
    exporting: {
      filename: `chart_${toolName}`,
      buttons: {
        contextButton: {
          text: 'Generate',
          symbolY: 15,
        },
      },
      chartOptions: {
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      },
    },
    chart: {
      type: 'column',
    },
    tooltip: {
      shared: true,
    },
    xAxis: {
      categories: years,
    },
    yAxis: {
      title: {
        text: 'Citations',
      },
      allowDecimals: false,
    },
    series,
    noData: {
      style: {
        fontSize: '30px',
      },
    },
  }
}
