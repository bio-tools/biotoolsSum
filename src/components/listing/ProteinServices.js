import React, { Component } from 'react'
import BioToolsFetch from '../BioToolsFetch'

class ProteinServices extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitted: false,
      query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&q=protein&sort=lastUpdate&ord=asc',
    }
  }

  render () {
    return (
      <div>
        <p className='lead'>All ELIXIR CZ Services for studies on protein sequences, secondary structures and structures.</p>
        <BioToolsFetch url={this.state.query} />
      </div>
    )
  }
}

export default ProteinServices
