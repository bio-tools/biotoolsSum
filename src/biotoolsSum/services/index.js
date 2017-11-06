import config from '../common/config'
import * as R from 'ramda'
import * as Rx from 'rxjs'
import { MAX_ROW_CELLS_COUNT } from '../../constants/toolsTable'

export const pickData = R.map(
  R.compose(
    R.evolve(
      {
        function: R.compose(R.prop('operation'), R.head),
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
      'publication',
      'pmids',
      'credit',
      'publicationsStrings',
      'publicationsIdSourcePairs',
    ])
  )
)

const getPublicationsInfo = uniquePublications => uniquePublications.map(pub => {
  let id = ''
  if (pub.doi !== null) {
    id = pub.doi
  } else if (pub.pmid !== null) {
    id = pub.pmid
  } else if (pub.pmcid !== null) {
    id = pub.pmcid
  } else {
    return Rx.Observable.of(null)
  }

  return Rx.Observable.fromPromise(fetch(config.getPublicationInfoApiUrl(id))
    .then(response => response.json())
    .then(publicationInfo => publicationInfo)
  )
})

export const updatedData = tools => {
  if (tools.length === 0) {
    return Rx.Observable.of([])
  }

  return tools.map(tool => {
    const { publication } = tool

    if (publication.length === 0) {
      return Rx.Observable.of(R.assoc('citations', 0, tool))
    }

    // There were occasionally duplicates in the publications record
    const uniquePublications = R.uniqBy(R.props(['doi', 'pmid', 'pmcid']), publication)

    return Rx.Observable
      .combineLatest(getPublicationsInfo(uniquePublications))
      .map(publicationsInfo => {
        const pickedPublicationsInfo = publicationsInfo[0] === null
          ? null
          : R.compose(
            R.map(R.props(['authorString', 'title', 'journalTitle', 'pubYear', 'pageInfo', 'id', 'source', 'citedByCount'])),
            R.filter(info => info !== undefined),
            R.pluck(0),
            R.pluck('result'),
            R.pluck('resultList'),
          )(publicationsInfo)

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
        }

        return R.compose(
          R.assoc('publicationsStrings', publicationsStrings),
          R.assoc('publicationsIdSourcePairs', publicationsIdSourcePairs),
          R.assoc('citations', citations),
        )(tool)
      })
  })
}

export function getServices (query, page = '?page=1') {
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

export function getCellsCount (includePropsChosen) {
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

export function orderByAttributeAndTakeFirstX (list, sortBy, order, takeFirstX) {
  return R.compose(
    R.take(takeFirstX),
    R.tap(console.log),
    R.sort(order === 'ascend'
        ? R.ascend(R.prop(sortBy))
        : R.descend(R.prop(sortBy)),
      R.__),
  )(list)
}
