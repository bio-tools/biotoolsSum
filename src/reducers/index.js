import { combineReducers } from 'redux'
import { specificServicesWithName } from './specificServices'

const portalApp = combineReducers({
  allServices: specificServicesWithName('all'),
  dna1dServices: specificServicesWithName('dna1d'),
  dna2dServices: specificServicesWithName('dna2d'),
  dna3dServices: specificServicesWithName('dna3d'),
  dnaxdServices: specificServicesWithName('dnaxd'),
})

export default portalApp
