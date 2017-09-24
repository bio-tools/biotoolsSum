import React, { PureComponent } from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ToolsTable } from './ToolsTable'
import { getServices } from '../../selectors/servicesSelector'
import { getServiceInfo } from '../../common/helperFunctions'
import Loader from '../common/Loader'

class BioToolsData extends PureComponent {
  render () {
    const { services, servicesInfo } = this.props
    const { count, list, serviceLoading, citationsLoading } = services

    return (
      <div>
        <Alert bsStyle='warning'>
          <h4>{servicesInfo.header}</h4> <small>{`All Elixir CZ services for studies on ${servicesInfo.message}.`}</small>
        </Alert>
        {count
          ? <div>
            <Alert bsStyle='warning'>
              {'There is a total number of '}<strong>{count}</strong> {'tools available.'}
              {serviceLoading &&
                <div>
                  <div className='loader-text'>
                    <span>{'Reloading tools...'}</span>
                    <br />
                    <span>{'This happens whenever you refresh page'}</span>
                  </div>
                  <Loader />
                </div>
              }
              {citationsLoading &&
              <div>
                <div className='loader-text'>
                  <span>{'Reloading citations count...'}</span>
                  <br />
                  <span>{'This might take some time, but you are free to explore tools.'}</span>
                </div>
                <Loader />
              </div>
              }
            </Alert>
            <ToolsTable list={list} />
          </div>
          : serviceLoading
            ? <Alert bsStyle='warning'>
              <div className='loader-text'>
                <span>{'Loading tools...'}</span>
                <br />
                <span>{'This might take some time...'}</span>
              </div>
              <Loader />
            </Alert>
            : <Alert bsStyle='danger'>{'We are sorry, but there are no services.'}</Alert>
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
