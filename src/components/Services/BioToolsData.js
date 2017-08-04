import React, { PureComponent } from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ToolsTable } from './ToolsTable'
import { getServices } from '../../selectors/servicesSelector'
import { getServiceInfo } from '../../common/helperFunctions'

class BioToolsData extends PureComponent {
  render () {
    const { services, servicesInfo } = this.props
    const { count, list } = services

    return (
      <div>
        <Alert bsStyle='warning'><h4>{servicesInfo.header}</h4> <small>{`All Elixir CZ services for studies on ${servicesInfo.message}`}</small></Alert>
        {count
          ? <div>
            <Alert bsStyle='warning'>
              There is a total number of <strong>{count}</strong> tools available
            </Alert>
            <ToolsTable list={list} />
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
    servicesInfo: getServiceInfo(servicesName),
  })
})(BioToolsData)
