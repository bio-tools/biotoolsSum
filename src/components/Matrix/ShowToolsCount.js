import React, { PureComponent } from 'react'
import 'whatwg-fetch'
import { Alert } from 'react-bootstrap'
import {DEFAULT_COLLECTION} from '../../constants/queryString'

class ShowToolsCount extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      databaseCount: 0,
      otherToolsCounts: 0,
      loadingToolsCount: true,
    }

    const collection = props.collection || DEFAULT_COLLECTION

    fetch(`https://bio.tools/api/tool/?collectionID=${collection}&q="database-portal"`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          databaseCount: data.count,
        })
      })
      .then(fetch(`https://bio.tools/api/tool/?collectionID=${collection}`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            otherToolsCount: data.count - this.state.databaseCount,
            loadingToolsCount: false,
          })
        }))
  }

  render () {
    const { databaseCount, otherToolsCount, loadingToolsCount } = this.state

    if (loadingToolsCount) {
      return <div />
    }

    return (
      <div>
        {databaseCount && otherToolsCount
          ? <Alert bsStyle='success'>
            There are <strong>{databaseCount}</strong> databases and <strong>{otherToolsCount}</strong> other tools
            available
          </Alert>
          : <Alert bsStyle='danger'>We are sorry, but there are no services.</Alert>}
      </div>
    )
  }
}

export default ShowToolsCount
