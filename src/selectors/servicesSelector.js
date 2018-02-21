import * as R from 'ramda'

export const getServices = (appState, servicesStateName) => appState[servicesStateName] || {}

export const getServicesCounts = appState => R.pluck('count', appState)

export const getServicesInfo = (appState, servicesStateName) => R.compose(
    R.map(R.omit(['serviceLoading', 'citationsLoading'])),
    R.pick(servicesStateName),
  )(appState)
