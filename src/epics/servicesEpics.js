import Rx from 'rxjs'
import * as ActionTypes from '../constants/actionTypes'
import { serverIsDown } from './configureEpics'
import { getServices } from '../biotoolsSum/services/index'
import buildActionWithName from '../helpers/buildActionWithName'
import buildAction from '../helpers/buildAction'

export const fetchServicesEpic = (action$) =>
  action$.ofType(ActionTypes.SERVICES_FETCH)
    .concatMap(({ payload: { name, query, page } }) => {
      return Rx.Observable.from(getServices(query, page))
        .map(data => buildActionWithName(ActionTypes.SERVICES_FETCH_SUCCESS, data, name))
        .catch(serverIsDown)
        .catch(() => Rx.Observable.of(buildAction(ActionTypes.SERVICES_FETCH_FAILURE)))
    })

export default [
  fetchServicesEpic,
]
