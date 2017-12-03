import React from 'react'
import renderer from 'react-test-renderer'
import MatrixCell from './MatrixCell'

it('Renders MatrixCell correctly', () => {
  const component = renderer.create(
    <MatrixCell text='This is some text' />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
