import React from 'react'
import renderer from 'react-test-renderer'
import SelectField from './SelectField'

it('Renders SelectField correctly', () => {
  const component = renderer.create(
    <SelectField label='Please, select something' input={{ name: 'snapshot-select' }}>
      <option value='option1'>{'Option 1'}</option>
      <option value='option2'>{'Option 2'}</option>
      <option value='option3'>{'Option 3'}</option>
    </SelectField>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
