import React from 'react'
import renderer from 'react-test-renderer'
import { createStore } from 'redux'
import reducers from '../../reducers'
import { Provider } from 'react-redux'
import NavbarForm from './NavbarForm'

const store = createStore(reducers(), {})

it('Renders MatrixCellWithLink with link and name correctly', () => {
  const component = renderer.create(
    <Provider store={store}>
      <NavbarForm />
    </Provider>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
