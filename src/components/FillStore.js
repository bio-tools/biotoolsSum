import React from 'react'
import { connect } from 'react-redux'
import buildActionCreators from '../helpers/buildActionCreators'
import * as ActionTypes from '../constants/actionTypes'
import { camelCased, createQueryString, config, servicesNames, configCollection } from '../common/helperFunctions'
import * as R from 'ramda'
import { ALL_SERVICES } from '../constants/stringConstants'
import { getServicesInfo } from '../selectors/servicesSelector'
import { getActiveCollection, getUserEnteredCollection } from '../selectors/collectionSelector'

class FillStore extends React.PureComponent {
  state = {
    timer: null,
  }

  componentDidMount () {
    this.fetchData()
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.activeCollection !== this.props.activeCollection && this.props.activeCollection !== ''
  }

  componentDidUpdate () {
    this.fetchData(true)
  }

  fetchData = (shouldFetch) => {
    const { activeCollection, isUserEnteredCollection, servicesInfo, servicesFetch, citationsFetch, setCollection } = this.props

    const allServices = camelCased(ALL_SERVICES)
    const allServicesInfo = servicesInfo[allServices]

    if (!isUserEnteredCollection) {
      setCollection({ collection: configCollection, userEnteredCollection: false })
    }

    if (shouldFetch || activeCollection !== configCollection || allServicesInfo.persistExpiresAt < Date.now() ||
      !allServicesInfo.serviceLoaded) {
      servicesFetch({
        name: allServices,
        query: `collectionID="${activeCollection || configCollection}"`,
      })
    } else if (!allServicesInfo.citationsLoaded) {
      citationsFetch({
        service: allServicesInfo.list,
        name: allServices,
      })
    }

    config.rows.forEach(row =>
      R.take(4, row.cells).forEach(cell => {
        if (!R.isEmpty(cell) && cell.route) {
          const name = camelCased(cell.route)
          const namedServicesInfo = servicesInfo[name]

          if (activeCollection !== configCollection || namedServicesInfo.persistExpiresAt < Date.now() ||
            !namedServicesInfo.serviceLoaded) {
            servicesFetch({
              name: name,
              query: createQueryString(R.assoc('collectionID', activeCollection || configCollection, cell.qsObject)),
            })
          } else if (!namedServicesInfo.citationsLoaded) {
            citationsFetch({
              service: namedServicesInfo.list,
              name,
            })
          }
        }
      })
    )
  }

  render () {
    return null
  }
}

export default FillStore = connect(state => ({
  servicesInfo: getServicesInfo(state, servicesNames),
  activeCollection: getActiveCollection(state),
  isUserEnteredCollection: getUserEnteredCollection(state),
}), buildActionCreators({
  servicesFetch: ActionTypes.SERVICES_FETCH,
  citationsFetch: ActionTypes.SERVICES_FETCH_SUCCESS,
  setCollection: ActionTypes.SET_COLLECTION,
}))(FillStore)
