import * as R from 'ramda'
import * as Actions from '../constants/actionTypes'
import { pickData } from '../biotoolsSum/services/index'

const initialState = {
  count: 0,
  list: [],
  persistExpiresAt: '',
  serviceLoading: false,
  serviceLoaded: false,
  citationsLoading: false,
  citationsLoaded: false,
}

export const specificServicesWithName = (servicesName = '') =>
  (state = initialState, action) => {
    const { type, payload } = action

    if (payload && payload.name !== servicesName) return state

    switch (type) {
      case Actions.SERVICES_FETCH:
        return R.evolve({
          serviceLoading: R.T,
          serviceLoaded: R.F,
          citationsLoading: R.F,
          citationsLoaded: R.F,
        })(state)

      case Actions.SERVICES_FETCH_SUCCESS: {
        const { count, list } = payload.service
        const pickedData = pickData(list)
        const oldListByIds = R.groupBy(R.prop('id'), state.list)
        const finalList = R.map(tool => R.mergeDeepLeft(tool, oldListByIds[tool.id][0]), pickedData)

        return R.evolve({
          count: R.always(count),
          list: R.always(finalList),
          serviceLoading: R.F,
          serviceLoaded: R.T,
          citationsLoading: R.T,
          persistExpiresAt: R.always(Date.now() + 6000), // 86400000 ms == 24 hours
        })(state)
      }

      case Actions.SERVICES_FETCH_FAILURE: {
        return R.evolve({
          serviceLoading: R.F,
          serviceLoaded: R.F,
        })(state)
      }

      case Actions.CITATIONS_FETCH_SUCCESS: {
        const { count, list } = payload.updatedService
        const pickedData = pickData(list)

        return R.evolve({
          count: R.always(count),
          list: R.always(pickedData),
          citationsLoading: R.F,
          citationsLoaded: R.T,
        })(state)
      }

      case Actions.CITATIONS_FETCH_FAILURE:
        return R.evolve({
          citationsLoading: R.F,
          citationsLoaded: R.F,
        })(state)

      default:
        return state
    }
  }
