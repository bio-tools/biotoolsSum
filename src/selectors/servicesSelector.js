import { createSelector } from 'reselect'

export const getServices = (appState, servicesStateName) => appState[servicesStateName] || {}

export const getServicesCount = createSelector(
  getServices,
  services => services.count
)
