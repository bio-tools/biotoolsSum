import React from 'react'
import renderer from 'react-test-renderer'
import MatrixCell from './MatrixCell'

it('Renders MatrixCell correctly', () => {
  const component = renderer.create(
    <MatrixCell />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('Renders MatrixCell with name correctly', () => {
  const component = renderer.create(
    <MatrixCell name='A cell' />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
