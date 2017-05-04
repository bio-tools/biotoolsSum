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
      <div>
        <h2>RNA Services</h2>
        <p className='lead'>All ELIXIR CZ Services for studies on RNA structures.</p>
        <BioToolsFetch url={this.state.query} />
      </div>
    )
  }
}

export default RNAServices
