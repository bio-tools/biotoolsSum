import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/App.css'
import '../node_modules/react-table/react-table.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import ServicesNavbar from './components/Services/ServicesNavbar'
import Services from './components/Services/Services'
import { Home } from './components/Home'
import ServicesMatrix from './components/Matrix/ServicesMatrix'
import './styles/index.css'
import { createEpicMiddleware } from 'redux-observable'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import configureEpics from './epics/configureEpics'
import reducers from './reducers'

const composeEnhancers = (
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

const webEpics = []

const rootEpic = configureEpics({}, webEpics)

const epicMiddleware = createEpicMiddleware(rootEpic)

const enhancers = [epicMiddleware]

const store = createStore(
  reducers, {},
  composeEnhancers(
    applyMiddleware(...enhancers)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className='container'>
        <Route exact path='/' component={Home} />
        <Route exact path='/:collection?/services' component={ServicesMatrix} />
        <Route path='/:collection?/services/:id' component={ServicesNavbar} />
        <Route path='/:collection?/services/:id' component={Services} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
