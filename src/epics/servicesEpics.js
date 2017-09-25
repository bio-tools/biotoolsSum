import Rx from 'rxjs'
import * as ActionTypes from '../constants/actionTypes'
import { serverIsDown } from './configureEpics'
import { getServices, updatedData } from '../biotoolsSum/services/index'
import buildActionWithName from '../helpers/buildActionWithName'
import buildAction from '../helpers/buildAction'
import * as R from 'ramda'

export const fetchServicesEpic = (action$, { getState }) =>
  action$.ofType(ActionTypes.SERVICES_FETCH)
    .concatMap(({ payload: { name, query } }) => {
      return Rx.Observable
        .fromPromise(getServices(query))
        .map((service) => buildActionWithName(ActionTypes.SERVICES_FETCH_SUCCESS, { service, name }))
        .retry(3)
        .catch(serverIsDown)
        .catch(() => Rx.Observable.of(buildAction(ActionTypes.SERVICES_FETCH_FAILURE)))
    })

export const fetchCitationsEpic = (action$) =>
  action$.ofType(ActionTypes.SERVICES_FETCH_SUCCESS)
    .concatMap(({ payload: { service, name } }) => Rx.Observable
      .combineLatest(updatedData(service.list))
      .map(tools => {
        const updatedService = R.assoc('list', tools, service)
        return buildActionWithName(ActionTypes.CITATIONS_FETCH_SUCCESS, { updatedService, name })
      })
      .retry(3)
      .catch(serverIsDown)
      .catch(() => Rx.Observable.of(buildAction(ActionTypes.CITATIONS_FETCH_FAILURE)))
    )

export default [
  fetchCitationsEpic,
  fetchServicesEpic,
]
