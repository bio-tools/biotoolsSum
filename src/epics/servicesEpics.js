import Rx from 'rxjs'
import * as ActionTypes from '../constants/actionTypes'
import { serverIsDown } from './configureEpics'
import { getServices } from '../biotoolsSum/services/index'
import buildActionWithName from '../helpers/buildActionWithName'
import buildAction from '../helpers/buildAction'
import * as R from 'ramda'

const citations = uniquePublications => uniquePublications.map(pub => {
  let id = ''
  let idType = ''
  if (pub.doi !== null && !pub.doi.startsWith('doi')) {
    id = pub.doi
    idType = 'doi'
  } else if (pub.pmid !== null) {
    id = pub.pmid
    idType = 'pmid'
  } else if (pub.pmcid !== null) {
    id = pub.pmcid
    idType = 'pmcid'
  } else {
    return Rx.Observable.of(0)
  }

  // Proxy needed because ncbi does not return 'Access-Control-Allow-Origin' header in response.
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const converterUrl = 'https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?tool=bio.toolsSum&email=dan.panda@gmail.com'
  const citationsUrl = 'http://www.ebi.ac.uk/europepmc/webservices/rest/PMC/'

  return Rx.Observable.fromPromise(fetch(proxyUrl + converterUrl + `&ids=${id}&idtype=${idType}&format=json`)
    .then(response => response.json())
    .then(idInfo => {
      if (!idInfo.records) {
        return 0
      }
      return fetch(citationsUrl + `${idInfo.records[0].pmcid}/citations/json`)
        .then(response => response.json())
        .then(citations => citations.hitCount)
    })
  )
})

const updatedData = tools => tools.map(tool => {
  const { publication } = tool

  if (publication.length === 0) {
    return Rx.Observable.of(tool)
  }

  const uniquePublications = R.uniqBy(R.props(['doi', 'pmid', 'pmcid']), publication)

  return Rx.Observable
    .combineLatest(citations(uniquePublications))
    .map(citations => R.assoc('citations', R.sum(citations), tool))
})

export const fetchServicesEpic = (action$) =>
  action$.ofType(ActionTypes.SERVICES_FETCH)
    .concatMap(({ payload: { name, query, page } }) => Rx.Observable
        .fromPromise(getServices(query, page))
        .switchMap(service => Rx.Observable
          .combineLatest(updatedData(service.list))
          .map(tools => {
            const updatedService = R.assoc('list', tools, service)
            return buildActionWithName(ActionTypes.SERVICES_FETCH_SUCCESS, updatedService, name)
          })
          .catch(serverIsDown)
          .catch(() => Rx.Observable.of(buildAction(ActionTypes.SERVICES_FETCH_FAILURE)))
        )
    )

// export const fetchServicesEpic = (action$) =>
//   action$.ofType(ActionTypes.SERVICES_FETCH)
//     .concatMap(({ payload: { name, query, page } }) => {
//       const updatedData = tools => tools.map(tool => {
//         const { publication } = tool
//
//         if (publication.length === 0) {
//           return Rx.Observable.of(tool)
//         }
//
//         // Proxy needed because ncbi does not return 'Access-Control-Allow-Origin' header in response.
//         const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
//         const converterUrl = 'https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?tool=bio.toolsSum&email=dan.panda@gmail.com'
//         const citationsUrl = 'http://www.ebi.ac.uk/europepmc/webservices/rest/PMC/'
//         let firstPublication = R.head(publication)
//
//         let id = ''
//         let idType = ''
//         if (firstPublication.doi !== null && !firstPublication.doi.startsWith('doi')) {
//           id = firstPublication.doi
//           idType = 'doi'
//         } else if (firstPublication.pmid !== null) {
//           id = firstPublication.pmid
//           idType = 'pmid'
//         } else if (firstPublication.pmcid !== null) {
//           id = firstPublication.pmcid
//           idType = 'pmcid'
//         } else {
//           return Rx.Observable.of(tool)
//         }
//
//         return Rx.Observable.fromPromise(fetch(proxyUrl + converterUrl + `&ids=${id}&idtype=${idType}&format=json`)
//           .then(response => response.json())
//           .then(idInfo => {
//             if (!idInfo.records) {
//               return tool
//             }
//             return fetch(citationsUrl + `${idInfo.records[0].pmcid}/citations/json`)
//               .then(response => response.json())
//               .then(data => R.assoc('citations', data, tool))
//           })
//         )
//       })
//
//       return Rx.Observable
//         .fromPromise(getServices(query, page))
//         .switchMap(service => Rx.Observable
//           .combineLatest(updatedData(service.list))
//           .map(tools => {
//             console.log('tools, ', tools)
//             const updatedService = R.assoc('list', tools, service)
//             return buildActionWithName(ActionTypes.SERVICES_FETCH_SUCCESS, updatedService, name)
//           })
//           .catch(serverIsDown)
//           .catch(() => Rx.Observable.of(buildAction(ActionTypes.SERVICES_FETCH_FAILURE)))
//         )
//     })

export default [
  fetchServicesEpic,
]
