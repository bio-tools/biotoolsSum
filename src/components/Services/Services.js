import React, { PureComponent } from 'react'
import * as R from 'ramda'
import BioToolsData from './BioToolsData'
import { Alert } from 'react-bootstrap'
import * as Type from '../../constants/queryConstants'
import {getApiUrl, getServiceInfo} from '../../common/helperFunctions'

class Services extends PureComponent {
  constructor (props) {
    super(props)

    const { id, collection } = props.match.params
    const newState = R.assoc('query', getApiUrl(id, collection), getServiceInfo(id))
    this.state = {
      ...newState,
      collection: collection || Type.DEFAULT_COLLECTION,
    }
  }

  componentWillReceiveProps (newProps) {
    if (!R.equals(newProps, this.props)) {
      const { id, collection } = newProps.match.params
      const newState = R.assoc('query', getApiUrl(id, collection), getServiceInfo(id))
      this.setState({
        ...newState,
        collection: collection || Type.DEFAULT_COLLECTION,
      })
    }
  }

  render () {
    return (
      <div>
        <Alert bsStyle='warning'><h4>{this.state.header}</h4> <small>{`All ${this.state.collection} services for studies on ${this.state.message}`}</small></Alert>
        <BioToolsData query={this.state.query} />
      </div>
    )
  }
}

export default Services
