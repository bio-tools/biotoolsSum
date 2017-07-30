import React, { PureComponent } from 'react'
import * as R from 'ramda'
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
import * as Type from '../../constants/servicesConstants'
import { getApiUrl } from '../../common/helperFunctions'
import * as Rx from 'rxjs'
import { connect } from 'react-redux'
import * as ActionTypes from '../../constants/actionTypes'
import buildActionCreators from '../../helpers/buildActionCreators'
import * as QueryConst from '../../constants/queryConstants'

class ServicesMatrix extends PureComponent {
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
      all: null,
    }
  }

  componentDidMount () {
    const collection = this.props.match.params.collection

    Rx.Observable
      .combineLatest(
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.DNA_1D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.DNA_2D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.DNA_3D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.DNA_XD_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.RNA_1D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.RNA_2D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.RNA_3D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.RNA_XD_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.PROTEIN_1D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.PROTEIN_2D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.PROTEIN_3D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.PROTEIN_XD_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.DRUG_1D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.DRUG_2D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.DRUG_3D_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.DRUG_XD_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count)
        ),
        Rx.Observable.fromPromise(fetch(getApiUrl(Type.ALL_SERVICES, collection))
          .then(response => response.json())
          .then(data => data.count))
      )
      .subscribe(values => {
        const services = R.zipObj([
          'dna1d', 'dna2d', 'dna3d', 'dnaxd',
          'rna1d', 'rna2d', 'rna3d', 'rnaxd',
          'protein1d', 'protein2d', 'protein3d', 'proteinxd',
          'drug1d', 'drug2d', 'drug3d', 'drugxd', 'all'], values)

        this.setState(services)
      })

    const { servicesFetch } = this.props

    servicesFetch({
      name: 'all',
      query: '',
    })
    servicesFetch({
      name: 'dna1d',
      query: QueryConst.DNA_1D_QUERY,
    })
    servicesFetch({
      name: 'dna2d',
      query: QueryConst.DNA_2D_QUERY,
    })
    servicesFetch({
      name: 'dna3d',
      query: QueryConst.DNA_3D_QUERY,
    })
    servicesFetch({
      name: 'dnaxd',
      query: QueryConst.DNA_XD_QUERY,
    })
  }

  render () {
    const { collection } = this.props.match.params

    const collectionID = collection ? `/${collection}/services` : '/services'

    return (
      <Grid>
        <div className='matrix'>
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.ALL_SERVICES}`} text='All services' numberOfServices={this.state.all} />
          <MatrixCell text='1D sequence' />
          <MatrixCell text='2D topology' />
          <MatrixCell text='3D structure' />
          <MatrixCell text='xD omics' />

          <MatrixCell text='DNA' />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DNA_1D_SERVICES}`} image={dna1D} numberOfServices={this.state.dna1d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DNA_2D_SERVICES}`} image={dna2D} numberOfServices={this.state.dna2d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DNA_3D_SERVICES}`} image={dna3D} numberOfServices={this.state.dna3d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DNA_XD_SERVICES}`} image={dnaxD} numberOfServices={this.state.dnaxd} />

          <MatrixCell text='RNA' />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.RNA_1D_SERVICES}`} image={rna1D} numberOfServices={this.state.rna1d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.RNA_2D_SERVICES}`} image={rna2D} numberOfServices={this.state.rna2d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.RNA_3D_SERVICES}`} image={rna3D} numberOfServices={this.state.rna3d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.RNA_XD_SERVICES}`} image={rnaxD} numberOfServices={this.state.rnaxd} />

          <MatrixCell text='Protein' />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.PROTEIN_1D_SERVICES}`} image={protein1D} numberOfServices={this.state.protein1d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.PROTEIN_2D_SERVICES}`} image={protein2D} numberOfServices={this.state.protein2d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.PROTEIN_3D_SERVICES}`} image={protein3D} numberOfServices={this.state.protein3d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.PROTEIN_XD_SERVICES}`} image={proteinxD} numberOfServices={this.state.proteinxd} />

          <MatrixCell text='Drugs and other small molecules' />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DRUG_1D_SERVICES}`} image={drug1D} numberOfServices={this.state.drug1d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DRUG_2D_SERVICES}`} image={drug2D} numberOfServices={this.state.drug2d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DRUG_3D_SERVICES}`} image={drug3D} numberOfServices={this.state.drug3d} />
          <MatrixCellWithLink linkTo={`${collectionID}/${Type.DRUG_XD_SERVICES}`} image={drugxD} numberOfServices={this.state.drugxd} />
        </div>
      </Grid>
    )
  }
}

export default ServicesMatrix = connect(state => ({}), buildActionCreators({
  servicesFetch: ActionTypes.SERVICES_FETCH,
}))(ServicesMatrix)
