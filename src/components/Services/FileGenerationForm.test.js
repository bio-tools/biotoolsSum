import React from 'react'
import renderer from 'react-test-renderer'
import { ConnectedRouter } from 'react-router-redux'
import { createStore } from 'redux'
import createHistory from 'history/createBrowserHistory'
import reducers from '../../reducers'
import { Provider } from 'react-redux'
import FileGenerationForm from './FileGenerationForm'

const store = createStore(reducers(), {})
const history = createHistory()

it('Renders MatrixCellWithLink with link and name correctly', () => {
  const component = renderer.create(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <FileGenerationForm />
      </ConnectedRouter>
    </Provider>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
