import React, { PureComponent } from 'react'
import R from 'ramda'
import 'whatwg-fetch'
import { Alert, Pagination } from 'react-bootstrap'
import Loader from 'react-loader'
import { PAGE_SIZE } from '../../constants/toolsTable'
import { ToolsTable } from './ToolsTable'
import {getServices} from '../../selectors/servicesSelector'
import {connect} from 'react-redux'

class BioToolsData extends PureComponent {
  render () {
    const { services } = this.props
    const { count } = services

    return (
      <div>
        <Alert bsStyle='warning'><h4>{`Header`}</h4> <small>{`All Elixir CZ services for studies on something`}</small></Alert>
        {count
          ? <div>
            <Alert bsStyle='warning'>
              There is a total number of <strong>{count}</strong> tools available
            </Alert>
            <ToolsTable list={services.list} />
          </div>
          : <Alert bsStyle='danger'>We are sorry, but there are no services.</Alert>
        }
      </div>
    )
  }
}

export default BioToolsData = connect(state => {
  const path = state.router.location.pathname
  const servicesName = path.slice('/services/'.length)

  return ({
    services: getServices(state, servicesName),
  })
})(BioToolsData)
