import React, { Component } from 'react'
import store from './redux/store'
import { Provider } from 'react-redux'
import R from 'ramda'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/App.css'
import '../node_modules/react-table/react-table.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import FormListing from './components/listing/Search/SearchListing'
import RNAServices from './components/listing/RNAServices'
import DNAServices from './components/listing/DNAServices'
import ProteinServices from './components/listing/ProteinServices'
import HomeServices from './components/HomeServices'
import ServicesNavbar from './components/ServicesNavbar'

class App extends Component {
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
      <Provider store={store}>
        <Router>
          <div className='container'>
            <Route exact path='/services' component={HomeServices} />
            <Route path='/services/*' component={ServicesNavbar} />
            <Route path='/services/dna-services' component={DNAServices} />
            <Route path='/services/rna-services' component={RNAServices} />
            <Route path='/services/protein-services' component={ProteinServices} />
            <Route path='/services/search-services' component={FormListing} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
