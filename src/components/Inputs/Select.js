import React from 'react'
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

const Select = ({ label, input, children, ...props }) => (
  <FormGroup controlId='form-control-select'>
    <ControlLabel>{label}</ControlLabel>
    <FormControl componentClass='select' {...input}>
      {children}
    </FormControl>
  </FormGroup>
)

export default Select
