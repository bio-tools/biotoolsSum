import React from 'react'
import renderer from 'react-test-renderer'
import ToggleCheckboxButtonGroup from './ToggleCheckboxButtonGroup'
import { ToggleButton } from 'react-bootstrap'

it('Renders ToggleCheckboxButtonGroup correctly', () => {
  const component = renderer.create(
    <ToggleCheckboxButtonGroup
      label='Toggle something, please'
      input={{ name: 'toggleCheckboxButtonGroup', onChange: value => value }}
      valueChosen={['value1']}
    >
      <ToggleButton value='value1'>{'Value 1'}</ToggleButton>
      <ToggleButton value='value2'>{'Value 2'}</ToggleButton>
      <ToggleButton value='value3'>{'Value 3'}</ToggleButton>
    </ToggleCheckboxButtonGroup>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
