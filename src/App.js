import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/App.css'
import '../node_modules/react-table/react-table.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import ServicesNavbar from './components/Services/ServicesNavbar'
import Services from './components/Services/Services'
import { Home } from './components/Home'
import { ServicesMatrix } from './components/Matrix/ServicesMatrix'

class App extends Component {
  render () {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/' component={Home} />
          <Route exact path='/:collection?/services' component={ServicesMatrix} />
          <Route path='/:collection?/services/:id' component={ServicesNavbar} />
          <Route path='/:collection?/services/:id' component={Services} />
        </div>
      </Router>
    )
  }
}

export default App
