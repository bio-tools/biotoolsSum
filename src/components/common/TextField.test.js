import React from 'react'
import renderer from 'react-test-renderer'
import TextField from './TextField'

it('Renders TextField correctly', () => {
  const component = renderer.create(
    <TextField label='I want to create my own graph by selecting tools' input={{ value: 'Hello', name: 'snapshot-textfield' }} />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
