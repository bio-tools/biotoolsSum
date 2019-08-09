import React from 'react'
import {Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import ToolsTable from './ToolsTable'
import {getServices} from '../../selectors/servicesSelector'
import {
  hyphenDelimitedToCamelCased,
  config,
  showOnlyAllServicesInCollection
} from '../../biotoolsSum/common/helperFunctions'
import Loader from '../common/Loader'
import * as R from 'ramda'
import {ALL_SERVICES} from '../../constants/stringConstants'
import FileGenerationForm from './FileGenerationForm'
import {formValueSelector} from 'redux-form'
import {orderByAttributeAndTakeFirstX} from '../../biotoolsSum/services/index'
import ToolsTableWithChart from './ToolsTableWithChart'
import {reportType} from '../../constants/generateFile'
import {getActiveCollection} from '../../selectors/collectionSelector'
import ToolsBasicTable from "./tables/ToolsBasicTable";
import ToolsExpertEvaluationTable from "./tables/ToolsExpertEvaluationTable";
import {Route, Switch} from "react-router";
import ToolsScientometryAvailabilityTable from "./tables/ToolsScientometryAvailabilityTable";

class BioToolsData extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return !!nextProps.services
  }

  render() {
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
    const {count, list, serviceLoading, citationsLoading} = services

    let toolsList = list
    if (reportTypeChosen !== reportType.CHART && sortBy && order) {
      toolsList = orderByAttributeAndTakeFirstX(list, sortBy, order, takeFirstX)
    }

    return (
      <div>
        {count
          ? <div>
            <Alert bsStyle='warning'>
              <div className='center-text'>
                {message + '.'}
                <br/>
                {'There is a total number of '}<strong>{count}</strong>{' tools available.'}
              </div>
              {serviceLoading &&
              <div className='center-text'>
                <br/>
                {'Reloading tools...'}
                <br/>
                {'This might take some time...'}
                <Loader/>
              </div>
              }
              {citationsLoading &&
              <div>
                <div className='center-text'>
                  <br/>
                  {'Reloading citations count...'}
                  <br/>
                  {'This might take some time, but you are free to explore tools.'}
                </div>
                <Loader/>
              </div>
              }
            </Alert>
            {showReportPage && <FileGenerationForm list={toolsList}/>}
            {/*<ToolsBasicTable list={toolsList}/>*/}
            {/*<ToolsExpertEvaluationTable list={toolsList}/>*/}
            {/*{reportTypeChosen === reportType.CHART*/}
            {/*  ? <ToolsTableWithChart list={toolsList} createGraph={createGraph} />*/}
            {/*  : <ToolsTable list={toolsList} includePropsChosen={includePropsChosen} sortBy={sortBy} order={order} />*/}
            {/*}*/}
            <Switch>
              {!showReportPage &&
              <Route path="/views/evaluation"
                     render={(props) => <ToolsExpertEvaluationTable {...props} list={toolsList}/>}/>}
              {!showReportPage &&
              <Route path="/views/basic" render={(props) => <ToolsBasicTable {...props} list={toolsList}/>}/>}
              {!showReportPage &&
              <Route path="/views/scientometry"
                     render={(props) => <ToolsScientometryAvailabilityTable {...props} list={toolsList}/>}/>
              }
              <Route path="/" render={(props) => reportTypeChosen === reportType.CHART
                ? <ToolsTableWithChart {...props} list={toolsList} createGraph={createGraph}/>
                : <ToolsTable {...props} list={toolsList} includePropsChosen={includePropsChosen} sortBy={sortBy}
                              order={order}/>
              }/>
            </Switch>
          </div>
          : serviceLoading
            ? <Alert bsStyle='warning'>
              <div className='center-text'>
                <br/>
                {'Loading tools...'}
                <br/>
                {'This might take some time...'}
                <Loader/>
              </div>
            </Alert>
            : <Alert bsStyle='danger'>{'We are sorry, but there are no services.'}</Alert>
        }
      </div>
    )
  }
}

export default BioToolsData = connect(state => {
  const path = state.router.location.pathname
  let servicesName = path.substr(path.lastIndexOf('/') + 1)

  if (showOnlyAllServicesInCollection) {
    servicesName = ALL_SERVICES
  }

  if (path === '/' && !showOnlyAllServicesInCollection) {
    return {}
  }

  const activeCollection = getActiveCollection(state)

  const message = servicesName === ALL_SERVICES
    ? `All ${activeCollection || 'selected'} services`
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
    services: getServices(state, hyphenDelimitedToCamelCased(servicesName)),
    message,
    reportTypeChosen: selector(state, 'reportType'),
    createGraph: selector(state, 'createGraph'),
    includePropsChosen: selector(state, 'includeProps'),
    sortBy: selector(state, 'sortBy'),
    order: selector(state, 'order'),
    takeFirstX: selector(state, 'takeFirstX'),
  })
})(BioToolsData)
