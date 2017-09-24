import R from 'ramda'
import * as Actions from '../constants/actionTypes'
import { pickData } from '../biotoolsSum/services/index'
import { REHYDRATE } from 'redux-persist'

const initialState = {
  count: 0,
  list: [],
  serviceLoading: false,
  citationsLoading: false,
}

export const specificServicesWithName = (servicesName = '') =>
  (state = initialState, action) => {
    const { type, payload } = action

    if (payload && payload.name !== servicesName) return state

    switch (type) {
      case Actions.SERVICES_FETCH:
        return R.evolve({
          serviceLoading: R.T,
          citationsLoading: R.F,
        })(state)

      case Actions.SERVICES_FETCH_SUCCESS: {
        const { count, list } = payload.service

        if (count === state.count) {
          return R.evolve({
            serviceLoading: R.F,
            citationsLoading: R.T,
          })(state)
        }

        const pickedData = pickData(list)

        return R.evolve({
          count: R.always(count),
          list: R.always(pickedData),
          serviceLoading: R.F,
          citationsLoading: R.T,
        })(state)
      }

      case Actions.SERVICES_FETCH_FAILURE:
        return R.assoc('serviceLoading', false, state)

      case Actions.CITATIONS_FETCH_SUCCESS: {
        const { count, list } = payload.updatedService
        const pickedData = pickData(list)

        return R.evolve({
          count: R.always(count),
          list: R.always(pickedData),
          citationsLoading: R.F,
        })(state)
      }

      case Actions.CITATIONS_FETCH_FAILURE:
        return R.assoc('citationsLoading', false, state)

      default:
        return state
    }
  }
