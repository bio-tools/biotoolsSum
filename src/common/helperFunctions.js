import * as Type from '../constants/routeConstants'
import * as R from 'ramda'

export const createQueryString = R.compose(
  R.join('&'),
  R.map(R.join('=')),
  R.toPairs,
  R.evolve({
    q: q => `"${q}"`,
    collectionID: collectionID => `"${collectionID}"`,
  }),
)

export const camelCased = string => string.replace(/-([a-z0-9])/g, match => match[1].toUpperCase())

export const getServiceInfo = id => {
  switch (id) {
    case Type.DNA_SERVICES_ROUTE:
      return {
        header: 'All DNA Services',
        message: 'DNA',
      }
    case Type.DNA_1D_SERVICES_ROUTE:
      return {
        header: '1D DNA Services',
        message: 'DNA sequences',
      }
    case Type.DNA_2D_SERVICES_ROUTE:
      return {
        header: '2D DNA Services',
        message: 'secondary DNA structures',
      }
    case Type.DNA_3D_SERVICES_ROUTE:
      return {
        header: '3D DNA Services',
        message: 'DNA structures',
      }
    case Type.DNA_XD_SERVICES_ROUTE:
      return {
        header: 'xD DNA Services',
        message: 'DNA-omics',
      }
    case Type.RNA_SERVICES_ROUTE:
      return {
        header: 'All RNA Services',
        message: 'RNA',
      }
    case Type.RNA_1D_SERVICES_ROUTE:
      return {
        header: '1D RNA Services',
        message: 'RNA sequences',
      }
    case Type.RNA_2D_SERVICES_ROUTE:
      return {
        header: '2D RNA Services',
        message: 'secondary RNA structures',
      }
    case Type.RNA_3D_SERVICES_ROUTE:
      return {
        header: '3D RNA Services',
        message: 'RNA structures',
      }
    case Type.RNA_XD_SERVICES_ROUTE:
      return {
        header: 'xD RNA Services',
        message: 'RNA-omics',
      }
    case Type.PROTEIN_SERVICES_ROUTE:
      return {
        header: 'All Protein Services',
        message: 'Protein',
      }
    case Type.PROTEIN_1D_SERVICES_ROUTE:
      return {
        header: '1D Protein Services',
        message: 'protein sequences',
      }
    case Type.PROTEIN_2D_SERVICES_ROUTE:
      return {
        header: '2D Protein Services',
        message: 'secondary protein structures',
      }
    case Type.PROTEIN_3D_SERVICES_ROUTE:
      return {
        header: '3D Protein Services',
        message: 'protein structures',
      }
    case Type.PROTEIN_XD_SERVICES_ROUTE:
      return {
        header: 'xD Protein Services',
        message: 'proteomics',
      }
    case Type.DRUG_SERVICES_ROUTE:
      return {
        header: 'All Drug Services',
        message: 'Drug',
      }
    case Type.DRUG_1D_SERVICES_ROUTE:
      return {
        header: '1D Drug Services',
        message: 'primary structures for small molecules',
      }
    case Type.DRUG_2D_SERVICES_ROUTE:
      return {
        header: '2D Drug Services',
        message: 'secondary structures for small molecules',
      }
    case Type.DRUG_3D_SERVICES_ROUTE:
      return {
        header: '3D Drug Services',
        message: 'structures for small molecules',
      }
    case Type.DRUG_XD_SERVICES_ROUTE:
      return {
        header: 'xD Drug Services',
        message: 'small "moleculeomics"',
      }
    case Type.ALL_SERVICES_ROUTE:
      return {
        header: 'All Services',
        message: 'DNA, RNA, protein and drugs',
      }
    default:
      return {}
  }
}
