import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { specificServicesWithName } from './specificServices'
import * as R from 'ramda'
import { ui } from './ui'
import { collection } from './collection'
import { servicesNames } from '../common/helperFunctions'

const biotoolsSumApp = () => {
  const reducers = R.map(specificServicesWithName, servicesNames)
  const servicesReducers = R.zipObj(servicesNames, reducers)

  return combineReducers(R.merge(servicesReducers, {
    ui,
    collection,
    router: routerReducer,
    form: reduxFormReducer,
  }))
}

export default biotoolsSumApp
