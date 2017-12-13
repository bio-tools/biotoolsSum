import * as R from 'ramda'
import { ALL_SERVICES } from '../../constants/stringConstants'

export const createQueryString = R.compose(
  R.join('&'),
  R.map(R.join('=')),
  R.toPairs,
  R.evolve({
    collectionID: collectionID => `"${collectionID}"`,
  }),
)

export const camelCased = string => string.replace(/-([a-z0-9])/g, match => match[1].toUpperCase())

export const config = window.config || require('../../../public/config.js').config

export const configCollection = config.collectionID

export const allowReportMode = config.allowReportMode

export const allowCollectionChange = config.allowCollectionChange

export const showOnlyAllServicesInCollection = config.showOnlyAllServicesInCollection

export const getServicesNames = showOnlyAllServicesInCollection
  ? [camelCased(ALL_SERVICES)]
  : R.compose(
    R.map(camelCased),
    R.prepend(ALL_SERVICES),
    R.pluck('route'),
    R.unnest,
    R.pluck('cells'),
    R.prop('rows'),
  )(config)