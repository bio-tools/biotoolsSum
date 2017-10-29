import * as R from 'ramda'
import * as Actions from '../constants/actionTypes'

const initialState = {
  showReportPage: false,
}

export const ui = (state = initialState, action) => {
  const { type } = action

  switch (type) {
    case Actions.REPORT_PAGE_CHANGE_VISIBILITY:
      return R.evolve({
        showReportPage: R.not,
      })(state)

    default:
      return state
  }
}
