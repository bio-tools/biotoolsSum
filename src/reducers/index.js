import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { specificServicesWithName } from './specificServices'
import * as ServicesNames from '../constants/routeConstants'

const portalApp = combineReducers({
  allServices: specificServicesWithName(ServicesNames.ALL_SERVICES_ROUTE),
  dna1dServices: specificServicesWithName(ServicesNames.DNA_1D_SERVICES_ROUTE),
  dna2dServices: specificServicesWithName(ServicesNames.DNA_2D_SERVICES_ROUTE),
  dna3dServices: specificServicesWithName(ServicesNames.DNA_3D_SERVICES_ROUTE),
  dnaXdServices: specificServicesWithName(ServicesNames.DNA_XD_SERVICES_ROUTE),
  rna1dServices: specificServicesWithName(ServicesNames.RNA_1D_SERVICES_ROUTE),
  rna2dServices: specificServicesWithName(ServicesNames.RNA_2D_SERVICES_ROUTE),
  rna3dServices: specificServicesWithName(ServicesNames.RNA_3D_SERVICES_ROUTE),
  rnaXdServices: specificServicesWithName(ServicesNames.RNA_XD_SERVICES_ROUTE),
  protein1dServices: specificServicesWithName(ServicesNames.PROTEIN_1D_SERVICES_ROUTE),
  protein2dServices: specificServicesWithName(ServicesNames.PROTEIN_2D_SERVICES_ROUTE),
  protein3dServices: specificServicesWithName(ServicesNames.PROTEIN_3D_SERVICES_ROUTE),
  proteinXdServices: specificServicesWithName(ServicesNames.PROTEIN_XD_SERVICES_ROUTE),
  drug1dServices: specificServicesWithName(ServicesNames.DRUG_1D_SERVICES_ROUTE),
  drug2dServices: specificServicesWithName(ServicesNames.DRUG_2D_SERVICES_ROUTE),
  drug3dServices: specificServicesWithName(ServicesNames.DRUG_3D_SERVICES_ROUTE),
  drugXdServices: specificServicesWithName(ServicesNames.DRUG_XD_SERVICES_ROUTE),
  router: routerReducer,
})

export default portalApp
