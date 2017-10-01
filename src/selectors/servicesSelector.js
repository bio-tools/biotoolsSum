import { createSelector } from 'reselect'
import * as R from 'ramda'

export const getServices = (appState, servicesStateName) => appState[servicesStateName] || {}

export const getServicesCount = createSelector(
  getServices,
  services => services.count
)

export const getAllServicesCounts = appState => R.pluck('count', appState)
