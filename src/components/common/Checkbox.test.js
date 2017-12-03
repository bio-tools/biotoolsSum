import React from 'react'
import renderer from 'react-test-renderer'
import Checkbox from './Checkbox'

it('Renders Checkbox correctly', () => {
  const component = renderer.create(
    <Checkbox label='Hello, check me' input={{ value: true, onChange: () => !this.props.value }} />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
