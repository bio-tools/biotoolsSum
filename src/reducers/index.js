import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { specificServicesWithName } from './specificServices'
import * as R from 'ramda'
import { ui } from './ui'
import { collection } from './collection'
import { getServicesNames } from '../biotoolsSum/common/helperFunctions'

const biotoolsSumApp = () => {
  const reducers = R.map(specificServicesWithName, getServicesNames)
  const servicesReducers = R.zipObj(getServicesNames, reducers)

  return combineReducers(R.merge(servicesReducers, {
    ui,
    collection,
    router: routerReducer,
    form: reduxFormReducer,
  }))
}

export default biotoolsSumApp
