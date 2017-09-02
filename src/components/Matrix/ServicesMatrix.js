import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'
import dna1D from '../../images/1d-dna.png'
import dna2D from '../../images/2d-dna.png'
import dna3D from '../../images/3d-dna.png'
import dnaxD from '../../images/xd-dna.png'
import rna1D from '../../images/1d-rna.png'
import rna2D from '../../images/2d-rna.png'
import rna3D from '../../images/3d-rna.png'
import rnaxD from '../../images/xd-rna.png'
import protein1D from '../../images/1d-protein.png'
import protein2D from '../../images/2d-protein.png'
import protein3D from '../../images/3d-protein.png'
import proteinxD from '../../images/xd-protein.png'
import drug1D from '../../images/1d-drug.png'
import drug2D from '../../images/2d-drug.png'
import drug3D from '../../images/3d-drug.png'
import drugxD from '../../images/xd-drug.png'
import { MatrixCell } from './MatrixCell'
import { MatrixCellWithLink } from './MatrixCellWithLink'
import { getServicesCount } from '../../selectors/servicesSelector'
import * as ServicesNames from '../../constants/routeConstants'
import * as R from 'ramda'

class ServicesMatrix extends PureComponent {
  render () {
    const { allServicesCount, dna1dServicesCount, dna2dServicesCount, dna3dServicesCount, dnaxdServicesCount,
      rna1dServicesCount, rna2dServicesCount, rna3dServicesCount, rnaxdServicesCount,
      protein1dServicesCount, protein2dServicesCount, protein3dServicesCount, proteinxdServicesCount,
      drug1dServicesCount, drug2dServicesCount, drug3dServicesCount, drugxdServicesCount} = this.props

    let obj = [
      {
        rowText: 'Test1',
        zituska: [
          {},
          {},
          {},
        ],
      },
      {
        rowText: 'Test2',
        zituska: [
          {},
          {},
          {},
        ],
      },
    ]

    obj = obj.map(embeddedObj => R.evolve({ zituska: R.take(4) }, embeddedObj))

    return (
      <Grid>
        <div className='matrix'>
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.ALL_SERVICES_ROUTE}`} text='All services' numberOfServices={allServicesCount} />
          <MatrixCell text='1D sequence' />
          <MatrixCell text='2D topology' />
          <MatrixCell text='3D structure' />
          <MatrixCell text='xD omics' />

          <MatrixCell text='DNA' />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.DNA_1D_SERVICES_ROUTE}`} image={dna1D} numberOfServices={dna1dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.DNA_2D_SERVICES_ROUTE}`} image={dna2D} numberOfServices={dna2dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.DNA_3D_SERVICES_ROUTE}`} image={dna3D} numberOfServices={dna3dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.DNA_XD_SERVICES_ROUTE}`} image={dnaxD} numberOfServices={dnaxdServicesCount} />

          <MatrixCell text='RNA' />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.RNA_1D_SERVICES_ROUTE}`} image={rna1D} numberOfServices={rna1dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.RNA_2D_SERVICES_ROUTE}`} image={rna2D} numberOfServices={rna2dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.RNA_3D_SERVICES_ROUTE}`} image={rna3D} numberOfServices={rna3dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.RNA_XD_SERVICES_ROUTE}`} image={rnaxD} numberOfServices={rnaxdServicesCount} />

          <MatrixCell text='Protein' />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.PROTEIN_1D_SERVICES_ROUTE}`} image={protein1D} numberOfServices={protein1dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.PROTEIN_2D_SERVICES_ROUTE}`} image={protein2D} numberOfServices={protein2dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.PROTEIN_3D_SERVICES_ROUTE}`} image={protein3D} numberOfServices={protein3dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.PROTEIN_XD_SERVICES_ROUTE}`} image={proteinxD} numberOfServices={proteinxdServicesCount} />

          <MatrixCell text='Drugs and other small molecules' />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.DRUG_1D_SERVICES_ROUTE}`} image={drug1D} numberOfServices={drug1dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.DRUG_2D_SERVICES_ROUTE}`} image={drug2D} numberOfServices={drug2dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.DRUG_3D_SERVICES_ROUTE}`} image={drug3D} numberOfServices={drug3dServicesCount} />
          <MatrixCellWithLink linkTo={`/services/${ServicesNames.DRUG_XD_SERVICES_ROUTE}`} image={drugxD} numberOfServices={drugxdServicesCount} />

          {obj.map(embeddedObj =>
            <div>
              <MatrixCell text={embeddedObj.rowText} />
              {embeddedObj.zituska.map(embObj => embObj === {}
                ? <MatrixCellWithLink
                  linkTo={`/services/${ServicesNames.DNA_1D_SERVICES_ROUTE}`}
                  image={dna1D}
                  numberOfServices={Math.floor(Math.random() * (100 - 1 + 1)) + 1}
                />
                : <MatrixCellWithLink
                  linkTo={`/services/${ServicesNames.RNA_2D_SERVICES_ROUTE}`}
                  image={rna2D}
                  numberOfServices={Math.floor(Math.random() * (100 - 1 + 1)) + 1}
                />
              )}
            </div>
          )}
        </div>
      </Grid>
    )
  }
}

export default ServicesMatrix = connect(state => {
  return ({
    allServicesCount: getServicesCount(state, 'allServices'),
    dna1dServicesCount: getServicesCount(state, 'dna1dServices'),
    dna2dServicesCount: getServicesCount(state, 'dna2dServices'),
    dna3dServicesCount: getServicesCount(state, 'dna3dServices'),
    dnaxdServicesCount: getServicesCount(state, 'dnaxdServices'),
    rna1dServicesCount: getServicesCount(state, 'rna1dServices'),
    rna2dServicesCount: getServicesCount(state, 'rna2dServices'),
    rna3dServicesCount: getServicesCount(state, 'rna3dServices'),
    rnaxdServicesCount: getServicesCount(state, 'rnaxdServices'),
    protein1dServicesCount: getServicesCount(state, 'protein1dServices'),
    protein2dServicesCount: getServicesCount(state, 'protein2dServices'),
    protein3dServicesCount: getServicesCount(state, 'protein3dServices'),
    proteinxdServicesCount: getServicesCount(state, 'proteinxdServices'),
    drug1dServicesCount: getServicesCount(state, 'drug1dServices'),
    drug2dServicesCount: getServicesCount(state, 'drug2dServices'),
    drug3dServicesCount: getServicesCount(state, 'drug3dServices'),
    drugxdServicesCount: getServicesCount(state, 'drugxdServices'),
  })
})(ServicesMatrix)
