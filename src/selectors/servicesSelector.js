import * as R from 'ramda'

export const getServices = (appState, servicesStateName) => appState[servicesStateName] || {}

export const getServicesCounts = appState => R.pluck('count', appState)
