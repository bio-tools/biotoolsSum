import config from '../common/config'
import * as R from 'ramda'
import * as Rx from 'rxjs'

export const pickData = R.map(
  R.compose(
    R.evolve(
      {
        function: R.compose(R.prop('operation'), R.head),
        pmids: R.reject(R.isNil),
      }),
    R.pick(['id', 'name', 'homepage', 'version', 'description', 'topic', 'maturity', 'operatingSystem', 'function', 'toolType', 'citations', 'publication', 'pmids'])
  )
)

function getCitations (id, idType) {
  return fetch(config.getProxyUrl() + config.getConverterApiUrl(`&ids=${id}&idtype=${idType}&format=json`))
    .then(response => response.json())
    .then(idInfo => {
      if (!idInfo.records) {
        return { citationsCount: 0 }
      }
      const pmid = idInfo.records[0].pmid
      return fetch(config.getCitationsApiUrl(`${pmid}/citations/json`))
        .then(response => response.json())
        .then(citations => {
          return pmid ? { citationsCount: citations.hitCount, pmid } : { citationsCount: citations.hitCount }
        })
    })
}

const getCitationsFromPublications = uniquePublications => uniquePublications.map(pub => {
  let id = ''
  let idType = ''
  if (pub.pmid !== null) {
    id = pub.pmid
    idType = 'pmid'
  } else if (pub.pmcid !== null) {
    id = pub.pmcid
    idType = 'pmcid'
  } else if (pub.doi !== null) {
    id = pub.doi
    idType = 'doi'
  } else {
    return Rx.Observable.of({ citationsCount: 0 })
  }

  return Rx.Observable.fromPromise(getCitations(id, idType))
})

export const updatedData = tools => {
  if (tools.length === 0) {
    return Rx.Observable.of([])
  }

  return tools.map(tool => {
    const { publication } = tool

    if (publication.length === 0) {
      return Rx.Observable.of(tool)
    }

    // There were occasionally duplicates in the publications record
    const uniquePublications = R.uniqBy(R.props(['doi', 'pmid', 'pmcid']), publication)

    return Rx.Observable
      .combineLatest(getCitationsFromPublications(uniquePublications))
      .map(citationsInfo => {
        const citations = R.sum(R.pluck('citationsCount', citationsInfo))
        const pmids = R.pluck('pmid', citationsInfo)
        return R.compose(
          R.assoc('pmids', pmids),
          R.assoc('citations', citations),
        )(tool)
      })
  })
}

export function getServices (query, page = '?page=1') {
  const url = config.getBioToolsApiUrl(`${page}&collectionID="ELIXIR-CZ"&${query}`)
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
