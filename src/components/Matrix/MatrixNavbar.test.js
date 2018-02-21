import React from 'react'
import renderer from 'react-test-renderer'
import MatrixNavbar from './MatrixNavbar'

it('Renders MatrixNavbar correctly', () => {
  const component = renderer.create(
    <MatrixNavbar />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
