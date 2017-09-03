import Rx from 'rxjs'
import * as ActionTypes from '../constants/actionTypes'
import { serverIsDown } from './configureEpics'
import { getCitations, getServices } from '../biotoolsSum/services/index'
import buildActionWithName from '../helpers/buildActionWithName'
import buildAction from '../helpers/buildAction'
import * as R from 'ramda'

const getCitationsFromPublications = uniquePublications => uniquePublications.map(pub => {
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

  return Rx.Observable.fromPromise(getCitations(id, idType))
})

const updatedData = tools => {
  if (tools.length === 0) {
    return Rx.Observable.of([])
  }

  return tools.map(tool => {
    const {publication} = tool

    if (publication.length === 0) {
      return Rx.Observable.of(tool)
    }

  // There were occasionally duplicates in the publications record
    const uniquePublications = R.uniqBy(R.props(['doi', 'pmid', 'pmcid']), publication)

    return Rx.Observable
      .combineLatest(getCitationsFromPublications(uniquePublications))
      .map(citations => R.assoc('citations', R.sum(citations), tool))
  })
}

export const fetchServicesEpic = (action$) =>
  action$.ofType(ActionTypes.SERVICES_FETCH)
    .concatMap(({ payload: { name, query } }) => Rx.Observable
      .fromPromise(getServices(query))
      .switchMap(service => Rx.Observable
        .combineLatest(updatedData(service.list))
        .map(tools => {
          const updatedService = R.assoc('list', tools, service)
          return buildActionWithName(ActionTypes.SERVICES_FETCH_SUCCESS, updatedService, name)
        })
        .catch(serverIsDown)
        .catch(() => Rx.Observable.of(buildAction(ActionTypes.SERVICES_FETCH_FAILURE))))
    )

export default [
  fetchServicesEpic,
]
