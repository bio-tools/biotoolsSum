import React, { Component } from 'react'
import store from './redux/store'
import { Provider } from 'react-redux'
import R from 'ramda'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './styles/App.css'
import '../node_modules/spectre.css/docs/dist/spectre.min.css'
import '../node_modules/react-table/react-table.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import FormListing from './components/listing/SearchListing/SearchListing'
import RNAServices from './components/listing/RNAServices'
import DNAServices from './components/listing/DNAServices'
import ProteinServices from './components/listing/ProteinServices'

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
            <div className='columns'>
              <div className='column col-3' >
                <Link to='/dna-services'>
                  <div className='card'>
                    <div className='card-image'>
                      <img className='img-responsive' src='http://i.imgbox.com/gVyLgccq.jpg' />
                    </div>
                    <div className='card-header'>
                      <h2 className='card-title text-center'>DNA services</h2>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='column col-3'>
                <Link to='/rna-services'>
                  <div className='card'>
                    <div className='card-image'>
                      <img className='img-responsive' src='http://i.imgbox.com/Vor14EZP.jpg' />
                    </div>
                    <div className='card-header'>
                      <h2 className='card-title text-center'>RNA services</h2>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='column col-3' >
                <div className='card'>
                  <Link to='/protein-services'>
                    <div className='card-image'>
                      <img className='img-responsive' src='http://i.imgbox.com/gVyLgccq.jpg' />
                    </div>
                    <div className='card-header'>
                      <h2 className='card-title text-center'>Protein services</h2>
                    </div>
                  </Link>
                </div>
              </div>
              <div className='column col-3' >
                <div className='card'>
                  <Link to='/search-services'>
                    <div className='card-image'>
                      <img className='img-responsive' src='http://i.imgbox.com/gVyLgccq.jpg' />
                    </div>
                    <div className='card-header'>
                      <h2 className='card-title text-center'>Get information from bio.tools with simple form</h2>
                    </div>
                  </Link>
                </div>
              </div>
              <Route path='/dna-services' component={DNAServices} />
              <Route path='/rna-services' component={RNAServices} />
              <Route path='/protein-services' component={ProteinServices} />
              <Route path='/search-services' component={FormListing} />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
