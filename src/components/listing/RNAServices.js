import React, { Component } from 'react'
import BioToolsFetch from '../BioToolsFetch'

class RNAServices extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitted: false,
      query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&q=rna&sort=lastUpdate&ord=asc',
    }
  }

  render () {
    return (
      <div className='container'>
        <BioToolsFetch url={this.state.query} />
      </div>
    )
  }
}

export default RNAServices
