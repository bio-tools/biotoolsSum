import * as R from 'ramda'

export const getServices = (appState, servicesStateName) => appState[servicesStateName] || {}

export const getServicesCounts = appState => R.pluck('count', appState)

export const getServicesInfo = (appState, servicesStateName) => R.compose(
    R.map(R.omit(['serviceLoading', 'citationsLoading'])),
    R.pick(servicesStateName),
  )(appState)

export const isLoadingInProgress = (appState, servicesStateName) => R.compose(
    R.any(R.equals(true)),
    R.unnest,
    R.map(R.props(['serviceLoading', 'citationsLoading'])),
    R.props(servicesStateName),
  )(appState)
