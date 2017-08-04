import R from 'ramda'
import * as Actions from '../constants/actionTypes'
import { pickData } from '../biotoolsSum/services/index'

const initialState = {
  count: 0,
  previous: null,
  next: null,
  list: [],
}

export const specificServicesWithName = (servicesName = '') => {
  return (state = initialState, action) => {
    const { type, payload, name } = action
    if (name !== servicesName) return state

    switch (type) {
      case Actions.SERVICES_FETCH_SUCCESS:
        const { count, previous, next, list } = payload
        const pickedData = pickData(list)

        return R.evolve({
          count: R.always(count),
          previous: R.always(previous),
          next: R.always(next),
          list: R.always(pickedData),
        })(state)
      default:
        return state
    }
  }
}
