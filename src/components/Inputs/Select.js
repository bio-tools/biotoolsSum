import React from 'react'
import { Col, ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

const Select = ({ label, input, children, ...custom }) => (
  <FormGroup controlId='form-control-select'>
    <ControlLabel>{label}</ControlLabel>
    <FormControl componentClass='select' {...input}>
      {children}
    </FormControl>
  </FormGroup>
)

export default Select
