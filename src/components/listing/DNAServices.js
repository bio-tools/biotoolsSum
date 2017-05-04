import React, { Component } from 'react'
import BioToolsFetch from '../BioToolsFetch'

class DNAServices extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitted: false,
      query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&q=dna&sort=lastUpdate&ord=asc',
    }
  }

  render () {
    return (
      <div>
        <p className='lead'>All ELIXIR CZ Services for studies on DNA sequences, secondary structures and structures.</p>
        <BioToolsFetch url={this.state.query} />
      </div>
    )
  }
}

export default DNAServices
