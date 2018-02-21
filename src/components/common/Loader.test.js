import React from 'react'
import renderer from 'react-test-renderer'
import Loader from './Loader'

it('Renders Loader correctly', () => {
  const component = renderer.create(
    <Loader />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
