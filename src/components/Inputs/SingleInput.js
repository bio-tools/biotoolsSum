import React from 'react'
import { Col, ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

const SingleInput = ({ label, input, ...props }) => (
  <FormGroup controlId='form-control-input'>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} {...props} />
  </FormGroup>
)

export default SingleInput
