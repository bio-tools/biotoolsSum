import React, { Component } from 'react'
import R from 'ramda'
import Form from './Form'
import BioToolsFetch from '../../BioToolsFetch'

const bioToolsApiCallUrl = R.compose(
  R.concat('https://bio.tools/api/tool/?'),
  R.join('&'),
  R.map(R.join('=')),
  R.toPairs,
  R.map(R.replace(/\s+/g, '-')),
  R.reject(R.equals('')),
  R.unless(
    R.has('sort'),
    R.assoc('sort', 'lastUpdate')
  ),
  R.unless(
    R.has('ord'),
    R.assoc('ord', 'asc')
  ),
  R.unless(
    R.has('collectionID'),
    R.assoc('collectionID', 'elixir-cz')
  )
)

class SearchListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitted: false,
      query: {},
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (values) {
    if (!R.equals(values, this.state.query)) {
      this.setState({
        submitted: true,
        query: values,
      })
    }
  }

  render () {
    return (
      <div>
        <h2>Search services from bio.tools database</h2>
        <Form onSubmit={this.handleFormSubmit} />
        {this.state.submitted && <div>
          <BioToolsFetch url={bioToolsApiCallUrl(this.state.query)} />
        </div>}
      </div>
    )
  }
}

export default SearchListing
