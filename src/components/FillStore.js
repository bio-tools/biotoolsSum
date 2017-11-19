import React from 'react'
import { connect } from 'react-redux'
import buildActionCreators from '../helpers/buildActionCreators'
import * as ActionTypes from '../constants/actionTypes'
import { camelCased, createQueryString, config } from '../common/helperFunctions'
import * as R from 'ramda'
import { ALL_SERVICES } from '../constants/stringConstants'

class FillStore extends React.PureComponent {
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
    const { servicesFetch } = this.props

    servicesFetch({
      name: camelCased(ALL_SERVICES),
      query: `collectionID="${config.collectionID}"`,
    })

    config.rows.forEach(row =>
      R.take(4, row.cells).forEach(cell => R.isEmpty(cell) || !cell.route
        ? null
        : servicesFetch({
          name: camelCased(cell.route),
          query: createQueryString(R.assoc('collectionID', config.collectionID, cell.qsObject)),
        })
      )
    )
  }

  render () {
    return null
  }
}

export default FillStore = connect(state => ({}), buildActionCreators({
  servicesFetch: ActionTypes.SERVICES_FETCH,
}))(FillStore)
