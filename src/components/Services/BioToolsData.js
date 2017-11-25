import React from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import ToolsTable from './ToolsTable'
import { getServices } from '../../selectors/servicesSelector'
import { camelCased, config } from '../../common/helperFunctions'
import Loader from '../common/Loader'
import * as R from 'ramda'
import { ALL_SERVICES } from '../../constants/stringConstants'
import FileGenerationForm from './FileGenerationForm'
import { formValueSelector } from 'redux-form'
import { orderByAttributeAndTakeFirstX } from '../../biotoolsSum/services/index'
import ToolsTableWithChart from './ToolsTableWithChart'
import { reportType } from '../../constants/generateFile'
import { getActiveCollection } from '../../selectors/collectionSelector'

class BioToolsData extends React.PureComponent {
  shouldComponentUpdate (nextProps) {
    return !!nextProps.services
  }

  render () {
    const {
      services,
      message,
      showReportPage,
      reportTypeChosen,
      createGraph,
      includePropsChosen,
      sortBy,
      order,
      takeFirstX,
    } = this.props
    const { count, list, serviceLoading, citationsLoading } = services

    let toolsList = list
    if (reportTypeChosen !== reportType.CHART && sortBy && order) {
      toolsList = orderByAttributeAndTakeFirstX(list, sortBy, order, takeFirstX)
    }

    return (
      <div>
        {count
          ? <div>
            <Alert bsStyle='warning'>
              {message + '.'}
              <br />
              {'There is a total number of '}<strong>{count}</strong>{' tools available.'}
              {serviceLoading &&
                <div>
                  <div className='loader-text'>
                    <span>
                      {'Reloading tools...'}
                    </span>
                    <br />
                    <span>
                      {'This might take some time'}
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
            {showReportPage && <FileGenerationForm list={toolsList} />}
            {reportTypeChosen === reportType.CHART
              ? <ToolsTableWithChart list={toolsList} createGraph={createGraph} />
              : <ToolsTable list={toolsList} includePropsChosen={includePropsChosen} sortBy={sortBy} order={order} />
            }
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
  const servicesName = path.substr(path.lastIndexOf('/') + 1)

  if (path === '/') {
    return null
  }

  const activeCollection = getActiveCollection(state)

  const message = servicesName === ALL_SERVICES
    ? `All ${config.collectionID} services`
    : R.compose(
      R.concat(`All ${activeCollection} `),
      R.prop('message'),
      R.find(R.propEq('route', servicesName)),
      R.flatten,
      R.pluck('cells'),
    )(config.rows)

  const selector = formValueSelector('fileGenerationForm')

  return ({
    showReportPage: state.ui.showReportPage,
    services: getServices(state, camelCased(servicesName)),
    message,

    reportTypeChosen: selector(state, 'reportType'),

    createGraph: selector(state, 'createGraph'),

    includePropsChosen: selector(state, 'includeProps'),
    sortBy: selector(state, 'sortBy'),
    order: selector(state, 'order'),
    takeFirstX: selector(state, 'takeFirstX'),
  })
})(BioToolsData)
