import * as R from 'ramda'
import * as Actions from '../constants/actionTypes'
import { configCollection } from '../common/helperFunctions'

const initialState = {
  activeCollection: '',
  userEnteredCollection: false,
}

export const collection = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case Actions.SET_COLLECTION:
      return R.evolve({
        activeCollection: R.always(payload.collection !== '' ? payload.collection : configCollection),
        userEnteredCollection: R.always(payload.collection !== '' ? payload.userEnteredCollection : false),
      })(state)

    default:
      return state
  }
}
