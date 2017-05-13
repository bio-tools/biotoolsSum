import React, { Component } from 'react'
import BioToolsFetch from '../BioToolsData'
import { PageHeader } from 'react-bootstrap'
import * as R from 'ramda'

function getStateObject (id) {
  console.log(id)
  switch (id) {
    case '1d-dna-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="dna-sequence"',
        header: '1D DNA Services',
        message: 'DNA sequences',
      }
    case '2d-dna-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="dna-secondary-structure"',
        header: '2D DNA Services',
        message: 'secondary DNA structures',
      }
    case '3d-dna-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="dna-structure"',
        header: '3D DNA Services',
        message: 'DNA structures',
      }
    case 'xd-dna-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="genomics"',
        header: 'xD DNA Services',
        message: 'DNA-omics',
      }
    case '1d-rna-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="rna-sequence"',
        header: '1D DNA Services',
        message: 'DNA sequences',
      }
    case '2d-rna-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="rna-secondary-structure"',
        header: '2D DNA Services',
        message: 'secondary DNA structures',
      }
    case '3d-rna-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="rna-structure"',
        header: '3D DNA Services',
        message: 'DNA structures',
      }
    case 'xd-rna-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="rna-omics"',
        header: 'xD DNA Services',
        message: 'DNA-omics',
      }
    case '1d-protein-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="protein-sequence"',
        header: '1D DNA Services',
        message: 'DNA sequences',
      }
    case '2d-protein-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="protein-secondary-structure"',
        header: '2D DNA Services',
        message: 'secondary DNA structures',
      }
    case '3d-protein-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="protein-structure"',
        header: '3D DNA Services',
        message: 'DNA structures',
      }
    case 'xd-protein-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="protein-omics"',
        header: 'xD DNA Services',
        message: 'DNA-omics',
      }
    case '1d-drug-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="drug-sequence"',
        header: '1D DNA Services',
        message: 'DNA sequences',
      }
    case '2d-drug-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="drug-secondary-structure"',
        header: '2D DNA Services',
        message: 'secondary DNA structures',
      }
    case '3d-drug-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="drug-structure"',
        header: '3D DNA Services',
        message: 'DNA structures',
      }
    case 'xd-drug-services':
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&q="drug-omics"',
        header: 'xD DNA Services',
        message: 'DNA-omics',
      }
    default:
      return {
        query: 'https://bio.tools/api/tool/?collectionID=elixir-cz&sort=lastUpdate&ord=asc&',
        header: 'ELIXIR CZ',
        message: 'DNA, RNA, protein and drugs',
      }
  }
}

class Services extends Component {
  constructor (props) {
    super(props)
    const newState = getStateObject(props.match.params.id)
    this.state = { ...newState }
  }

  componentWillReceiveProps (newProps) {
    if (!R.equals(newProps, this.props)) {
      const newState = getStateObject(newProps.match.params.id)
      this.state = { ...newState }
    }
  }

  render () {
    return (
      <div>
        <PageHeader>{this.state.header} <small>All ELIXIR CZ services for studies on {this.state.message}</small></PageHeader>
        <BioToolsFetch url={this.state.query} />
      </div>
    )
  }
}

export default Services
