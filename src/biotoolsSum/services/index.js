import config from '../common/config'
import * as R from 'ramda'
import * as Rx from 'rxjs'

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
      'publicationStrings',
    ])
  )
)

function getPublicationInfo (id, idType) {
  return fetch(config.getProxyUrl() + config.getConverterApiUrl(`&ids=${id}&idtype=${idType}&format=json`))
    .then(response => response.json())
    .then(idInfo => {
      if (!idInfo.records) {
        return null
      }
      const pmid = idInfo.records[0].pmid
      return fetch(config.getPublicationInfoApiUrl(pmid, 'med'))
        .then(response => response.json())
        .then(publicationInfo => publicationInfo)
    })
}

const getPublicationsInfo = uniquePublications => uniquePublications.map(pub => {
  let id = ''
  let idType = ''
  if (pub.pmid !== null) {
    id = pub.pmid
    idType = 'pmid'
  } else if (pub.pmcid !== null) {
    id = pub.pmcid
    idType = 'pmcid'
  } else if (pub.doi !== null) {
    id = pub.doi.startsWith('doi:') ? pub.doi.replace('doi:', '') : pub.doi
    idType = 'doi'
  } else {
    return Rx.Observable.of(null)
  }

  return Rx.Observable.fromPromise(getPublicationInfo(id, idType))
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
            R.map(R.props(['authorString', 'title', 'journalTitle', 'pubYear', 'pageInfo', 'pmid', 'citedByCount'])),
            R.filter(info => info !== undefined),
            R.pluck(0),
            R.pluck('result'),
            R.pluck('resultList'),
          )(publicationsInfo)

        let citations = 0
        let publicationStrings = []
        let pmids = []
        if (pickedPublicationsInfo) {
          publicationStrings = R.compose(
            R.map(R.join(', ')),
            R.map(R.props([0, 1, 2, 3, 4])),
          )(pickedPublicationsInfo)

          pmids = R.pluck(5, pickedPublicationsInfo)

          citations = R.compose(
            R.sum,
            R.pluck(6),
          )(pickedPublicationsInfo)
        }

        return R.compose(
          R.assoc('publicationStrings', publicationStrings),
          R.assoc('pmids', pmids),
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
