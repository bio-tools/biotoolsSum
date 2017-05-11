import React from 'react'
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap'

const RadioGroup = ({ label, children, ...props }) => (
  <FormGroup controlId='form-control-radio' {...props}>
    <ControlLabel>{label}</ControlLabel>
    <FormGroup>
      {children}
    </FormGroup>
  </FormGroup>
)

export default RadioGroup
