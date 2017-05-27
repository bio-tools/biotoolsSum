import React, { Component } from 'react'
import store from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/App.css'
import '../node_modules/react-table/react-table.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import ServicesNavbar from './components/ServicesNavbar'
import Services from './components/Services'
import { Home } from './components/Home'
import { ServicesMatrix } from './components/ServicesMatrix'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/services' component={ServicesMatrix} />
            <Route path='/services/:id' component={ServicesNavbar} />
            <Route path='/services/:id' component={Services} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
