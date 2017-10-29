import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { specificServicesWithName } from './specificServices'
import * as R from 'ramda'
import { data } from '../constants/servicesInfo'
import { camelCased } from '../common/helperFunctions'
import { ALL_SERVICES } from '../constants/stringConstants'
import { ui } from './ui'

const getReducerNames = R.compose(
  R.append(camelCased(ALL_SERVICES)),
  R.map(camelCased),
  R.reject(R.isNil),
  R.map(R.prop('route')),
  R.flatten,
  R.pluck('cells'),
)

const biotoolsSumApp = () => {
  const services = getReducerNames(data.rows)
  const reducers = R.map(specificServicesWithName, services)
  const servicesReducers = R.zipObj(services, reducers)

  return combineReducers(R.merge(servicesReducers, {
    ui,
    router: routerReducer,
    form: reduxFormReducer,
  }))
}

export default biotoolsSumApp
