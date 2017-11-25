// @flow
import Rx from 'rxjs'
import Alert from 'react-s-alert'
import * as Actions from '../constants/actionTypes'

export const errorEpic = (action$) =>
  action$
    .switchMap(({ type }) => {
      switch (type) {
        case Actions.SERVICES_FETCH_FAILURE:
          Alert.error('Sorry, there is a problem with loading tools from bio.tools, try again after few minutes.')
          break
        case Actions.CITATIONS_FETCH_FAILURE:
          Alert.error('Sorry, there is a problem with loading publications info, try again after few minutes.')
          break
        default:
      }
      return Rx.Observable.of()
    })

export default [
  errorEpic,
]
