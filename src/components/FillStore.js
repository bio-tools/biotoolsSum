import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import buildActionCreators from '../helpers/buildActionCreators'
import * as ActionTypes from '../constants/actionTypes'
import * as ServicesNames from '../constants/routeConstants'
import * as QueryConst from '../constants/queryConstants'

class FillStore extends PureComponent {
  state = {
    timer: null,
  }

  componentDidMount () {
    this.fetchData()
    let timer = setInterval(this.fetchData, 1200000)
    this.setState({ timer })
  }

  componentWillUnmount () {
    this.clearInterval(this.state.timer)
  }

  fetchData = () => {
    console.log(new Date())
    const { servicesFetch } = this.props

    servicesFetch({
      name: ServicesNames.ALL_SERVICES_ROUTE,
      query: '',
    })

    servicesFetch({
      name: ServicesNames.DNA_1D_SERVICES_ROUTE,
      query: QueryConst.DNA_1D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.DNA_2D_SERVICES_ROUTE,
      query: QueryConst.DNA_2D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.DNA_3D_SERVICES_ROUTE,
      query: QueryConst.DNA_3D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.DNA_XD_SERVICES_ROUTE,
      query: QueryConst.DNA_XD_QUERY,
    })

    servicesFetch({
      name: ServicesNames.RNA_1D_SERVICES_ROUTE,
      query: QueryConst.RNA_1D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.RNA_2D_SERVICES_ROUTE,
      query: QueryConst.RNA_2D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.RNA_3D_SERVICES_ROUTE,
      query: QueryConst.RNA_3D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.RNA_XD_SERVICES_ROUTE,
      query: QueryConst.RNA_XD_QUERY,
    })

    servicesFetch({
      name: ServicesNames.PROTEIN_1D_SERVICES_ROUTE,
      query: QueryConst.PROTEIN_1D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.PROTEIN_2D_SERVICES_ROUTE,
      query: QueryConst.PROTEIN_2D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.PROTEIN_3D_SERVICES_ROUTE,
      query: QueryConst.PROTEIN_3D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.PROTEIN_XD_SERVICES_ROUTE,
      query: QueryConst.PROTEIN_XD_QUERY,
    })

    servicesFetch({
      name: ServicesNames.DRUG_1D_SERVICES_ROUTE,
      query: QueryConst.DRUG_1D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.DRUG_2D_SERVICES_ROUTE,
      query: QueryConst.DRUG_2D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.DRUG_3D_SERVICES_ROUTE,
      query: QueryConst.DRUG_3D_QUERY,
    })
    servicesFetch({
      name: ServicesNames.DRUG_XD_SERVICES_ROUTE,
      query: QueryConst.DRUG_XD_QUERY,
    })
  }

  render () {
    return <div />
  }
}

export default FillStore = connect(state => ({}), buildActionCreators({
  servicesFetch: ActionTypes.SERVICES_FETCH,
}))(FillStore)
