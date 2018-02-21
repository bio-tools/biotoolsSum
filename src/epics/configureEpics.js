import * as Rx from 'rxjs'
import { combineEpics } from 'redux-observable'
import buildAction from '../helpers/buildAction'
import * as ActionTypes from '../constants/actionTypes'
import servicesEpics from './servicesEpics'
import errorEpics from './errorEpics'

const epics = [...servicesEpics, ...errorEpics]

const configureEpics = (deps, platformEpics) => (action$, { getState }) =>
  combineEpics(...epics, ...platformEpics)(action$, { ...deps, getState })

export default configureEpics

export const serverIsDown = (val) => {
  return val.status === 0 || val.status >= 500
    ? Rx.Observable.of(buildAction(ActionTypes.SERVER_NOT_RESPONDING))
    : Rx.Observable.throw(val)
}
