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
        let finalList = pickData(list)

        if (state.list.length !== 0) {
          const oldListByIds = R.groupBy(R.prop('id'), state.list)
          finalList = R.map(tool => R.mergeDeepLeft(tool, oldListByIds[tool.id] ? oldListByIds[tool.id][0] : {}), finalList)
        }

        return R.evolve({
          count: R.always(count),
          list: R.always(finalList),
          serviceLoading: R.F,
          serviceLoaded: R.T,
          citationsLoading: R.T,
          persistExpiresAt: R.always(Date.now() + 600000), // 86400000 ms == 24 hours
        })(state)
      }

      case Actions.SERVICES_FETCH_FAILURE: {
        return R.evolve({
          serviceLoading: R.F,
          serviceLoaded: R.F,
        })(state)
      }

      case Actions.CITATIONS_FETCH_SUCCESS: {
        const { count, list } = payload.service
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

      case Actions.UPTIME_FETCH_SUCCESS: {
        const { count, list } = payload.service
        const pickedData = pickData(list)

        return R.evolve({
          count: R.always(count),
          list: R.always(pickedData),
        })(state)
      }

      case Actions.UPTIME_FETCH_FAILURE: {
        // todo
      }

      default:
        return state
    }
  }
