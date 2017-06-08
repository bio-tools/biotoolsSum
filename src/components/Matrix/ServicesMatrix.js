import React, { PureComponent } from 'react'
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
import * as Type from '../../constants/services'

function getApiUrl (id, collection) {
  switch (id) {
    case Type.DNA_1D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="dna-sequence"`

    case Type.DNA_2D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="dna-secondary-structure"`

    case Type.DNA_3D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="dna-structure"`

    case Type.DNA_XD_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="genomics"`

    case Type.RNA_1D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="rna-sequence"`

    case Type.RNA_2D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="rna-secondary-structure"`

    case Type.RNA_3D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="rna-structure"`

    case Type.RNA_XD_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="rna-omics"`

    case Type.PROTEIN_1D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="protein-sequence"`

    case Type.PROTEIN_2D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="protein-secondary-structure"`

    case Type.PROTEIN_3D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="protein-structure"`

    case Type.PROTEIN_XD_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="protein-omics"`

    case Type.DRUG_1D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="small-molecule-primary-sequence"`

    case Type.DRUG_2D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="small-molecule-secondary-structure"`

    case Type.DRUG_3D_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="small-molecule-structure"`

    case Type.DRUG_XD_SERVICES:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc&q="small-molecule-omics"`

    default:
      return `https://bio.tools/api/tool/?collectionID=${collection}&sort=name&ord=asc`
  }
}

export default class ServicesMatrix extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      dna1d: null,
      dna2d: null,
      dna3d: null,
      dnaxd: null,
      rna1d: null,
      rna2d: null,
      rna3d: null,
      rnaxd: null,
      protein1d: null,
      protein2d: null,
      protein3d: null,
      proteinxd: null,
      drug1d: null,
      drug2d: null,
      drug3d: null,
      drugxd: null,
    }
  }

  componentDidMount () {
    const collection = this.props.match.params.collection || Type.DEFAULT_COLLECTION

    fetch(getApiUrl(Type.DNA_1D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          dna1d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.DNA_2D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          dna2d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.DNA_3D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          dna3d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.DNA_XD_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          dnaxd: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.RNA_1D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          rna1d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.RNA_2D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          rna2d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.RNA_3D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          rna3d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.RNA_XD_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          rnaxd: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.PROTEIN_1D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          protein1d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.PROTEIN_2D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          protein2d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.PROTEIN_3D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          protein3d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.PROTEIN_XD_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        console.log(data.count)
        this.setState({
          proteinxd: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.DRUG_1D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          drug1d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.DRUG_2D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          drug2d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.DRUG_3D_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          drug3d: data.count === 0,
        })
      })

    fetch(getApiUrl(Type.DRUG_XD_SERVICES, collection))
      .then(response => response.json())
      .then(data => {
        this.setState({
          drugxd: data.count === 0,
        })
      })
  }

  render () {
    const { collection } = this.props.match.params

    const collectionID = collection ? `/${collection}/services` : '/services'

    return (
      <Grid>
        <div className='matrix'>
          <MatrixCell text='All services' />
          <MatrixCell text='1D sequence' />
          <MatrixCell text='2D typology' />
          <MatrixCell text='3D structure' />
          <MatrixCell text='xD omics' />

          <MatrixCell text='DNA' />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DNA_1D_SERVICES}`} image={dna1D} grey={this.state.dna1d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DNA_2D_SERVICES}`} image={dna2D} grey={this.state.dna2d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DNA_3D_SERVICES}`} image={dna3D} grey={this.state.dna3d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DNA_XD_SERVICES}`} image={dnaxD} grey={this.state.dnaxd} />

          <MatrixCell text='RNA' />
          <MatrixCellWithLink linkTo={`${collectionID}/1d-rna-services`} image={rna1D} grey={this.state.rna1d} />
          <MatrixCellWithLink linkTo={`${collectionID}/2d-rna-services`} image={rna2D} grey={this.state.rna2d} />
          <MatrixCellWithLink linkTo={`${collectionID}/3d-rna-services`} image={rna3D} grey={this.state.rna3d} />
          <MatrixCellWithLink linkTo={`${collectionID}/xd-rna-services`} image={rnaxD} grey={this.state.rnaxd} />

          <MatrixCell text='Protein' />
          <MatrixCellWithLink linkTo={`${collectionID}/1d-protein-services`} image={protein1D} grey={this.state.protein1d} />
          <MatrixCellWithLink linkTo={`${collectionID}/2d-protein-services`} image={protein2D} grey={this.state.protein2d} />
          <MatrixCellWithLink linkTo={`${collectionID}/3d-protein-services`} image={protein3D} grey={this.state.protein3d} />
          <MatrixCellWithLink linkTo={`${collectionID}/xd-protein-services`} image={proteinxD} grey={this.state.proteinxd} />

          <MatrixCell text='Drugs and other small molecules' />
          <MatrixCellWithLink linkTo={`${collectionID}/1d-drug-services`} image={drug1D} grey={this.state.drug1d} />
          <MatrixCellWithLink linkTo={`${collectionID}/2d-drug-services`} image={drug2D} grey={this.state.drug2d} />
          <MatrixCellWithLink linkTo={`${collectionID}/3d-drug-services`} image={drug3D} grey={this.state.drug3d} />
          <MatrixCellWithLink linkTo={`${collectionID}/xd-drug-services`} image={drugxD} grey={this.state.drugxd} />
        </div>
        <ShowToolsCount collection={collection} />
      </Grid>
    )
  }
}
