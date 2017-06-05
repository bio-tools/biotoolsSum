import React from 'react'
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
import ShowToolsCount from './ShowToolsCount'
import { MatrixCell } from './MatrixCell'
import { MatrixCellWithLink } from './MatrixCellWithLink'

export const ServicesMatrix = ({ match }) => {
  const { collection } = match.params

  const queryString = collection ? `/${collection}/services` : '/services'

  return (
    <Grid>
      <div className='matrix'>
        <MatrixCell text='All services' />
        <MatrixCell text='1D sequence' />
        <MatrixCell text='2D typology' />
        <MatrixCell text='3D structure' />
        <MatrixCell text='xD omics' />

        <MatrixCell text='DNA' />
        <MatrixCellWithLink linkTo={`${queryString}/1d-dna-services`} image={dna1D} />
        <MatrixCellWithLink linkTo={`${queryString}/2d-dna-services`} image={dna2D} />
        <MatrixCellWithLink linkTo={`${queryString}/3d-dna-services`} image={dna3D} />
        <MatrixCellWithLink linkTo={`${queryString}/xd-dna-services`} image={dnaxD} />

        <MatrixCell text='RNA' />
        <MatrixCellWithLink linkTo={`${queryString}/1d-rna-services`} image={rna1D} />
        <MatrixCellWithLink linkTo={`${queryString}/2d-rna-services`} image={rna2D} />
        <MatrixCellWithLink linkTo={`${queryString}/3d-rna-services`} image={rna3D} />
        <MatrixCellWithLink linkTo={`${queryString}/xd-rna-services`} image={rnaxD} />

        <MatrixCell text='Protein' />
        <MatrixCellWithLink linkTo={`${queryString}/1d-protein-services`} image={protein1D} />
        <MatrixCellWithLink linkTo={`${queryString}/2d-protein-services`} image={protein2D} />
        <MatrixCellWithLink linkTo={`${queryString}/3d-protein-services`} image={protein3D} />
        <MatrixCellWithLink linkTo={`${queryString}/xd-protein-services`} image={proteinxD} />

        <MatrixCell text='Drugs and other small molecules' />
        <MatrixCellWithLink linkTo={`${queryString}/1d-drug-services`} image={drug1D} />
        <MatrixCellWithLink linkTo={`${queryString}/2d-drug-services`} image={drug2D} />
        <MatrixCellWithLink linkTo={`${queryString}/3d-drug-services`} image={drug3D} />
        <MatrixCellWithLink linkTo={`${queryString}/xd-drug-services`} image={drugxD} />
      </div>
      <ShowToolsCount collection={collection} />
    </Grid>
  )
}
