import React from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ToolsTable } from './ToolsTable'
import { getServices } from '../../selectors/servicesSelector'
import { camelCased } from '../../common/helperFunctions'
import { data } from '../../constants/servicesInfo'
import Loader from '../common/Loader'
import * as R from 'ramda'
import { ALL_SERVICES } from '../../constants/stringConstants'
import DocxGeneration from './FileGenerationForm'
import { formValueSelector } from 'redux-form'
import { orderByAttributeAndTakeFirstX } from '../../biotoolsSum/services/index'

class BioToolsData extends React.PureComponent {
  shouldComponentUpdate (nextProps) {
    return !!nextProps.services
  }

  render () {
    const { services, message, showReportPage, includePropsChosen, sortBy, order, takeFirstX } = this.props
    const { count, list, serviceLoading, citationsLoading } = services

    let toolsList = list
    if (sortBy && order) {
      console.log('list', list)
      toolsList = orderByAttributeAndTakeFirstX(list, sortBy, order, takeFirstX)
    }

    return (
      <div>
        {message &&
          <Alert bsStyle='warning'>
            {message}
          </Alert>
        }
        {count
          ? <div>
            <Alert bsStyle='warning'>
              {'There is a total number of '}<strong>{count}</strong>{' tools available.'}
              {serviceLoading &&
                <div>
                  <div className='loader-text'>
                    <span>
                      {'Reloading tools...'}
                    </span>
                    <br />
                    <span>
                      {'This happens whenever you refresh page'}
                    </span>
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
            {showReportPage && <DocxGeneration list={toolsList} />}
            <ToolsTable list={toolsList} includePropsChosen={includePropsChosen} sortBy={sortBy} order={order} />
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
  const servicesName = path.slice('/'.length)

  if (path === '/') {
    return null
  }

  const message = servicesName === ALL_SERVICES
    ? `All ${data.collectionID} Services`
    : R.compose(
    R.prop('message'),
    R.find(R.propEq('route', servicesName)),
    R.flatten,
    R.pluck('cells'),
  )(data.rows)

  const selector = formValueSelector('fileGenerationForm')

  return ({
    showReportPage: state.ui.showReportPage,
    services: getServices(state, camelCased(servicesName)),
    message,
    includePropsChosen: selector(state, 'includeProps'),
    sortBy: selector(state, 'sortBy'),
    order: selector(state, 'order'),
    takeFirstX: selector(state, 'takeFirstX')
  })
})(BioToolsData)
