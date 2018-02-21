import React from 'react'
import renderer from 'react-test-renderer'
import ToggleRadioButtonGroup from './ToggleRadioButtonGroup'
import { ToggleButton } from 'react-bootstrap'

it('Renders ToggleRadioButtonGroup correctly', () => {
  const component = renderer.create(
    <ToggleRadioButtonGroup
      label='Toggle one thing, please'
      input={{ name: 'toggleRadioButtonGroup', onChange: value => value }}
      valueChosen='value1'
    >
      <ToggleButton value='value1'>{'Value 1'}</ToggleButton>
      <ToggleButton value='value2'>{'Value 2'}</ToggleButton>
      <ToggleButton value='value3'>{'Value 3'}</ToggleButton>
    </ToggleRadioButtonGroup>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
