import React from 'react'
import {Col, ControlLabel, FormGroup} from 'react-bootstrap'

const RadioGroup = ({ label, children, ...props }) => (
  <FormGroup controlId='form-control-radio' {...props}>
    <Col componentClass={ControlLabel} sm={2}>
      {label}
    </Col>
    <Col sm={10}>
      {children}
    </Col>
  </FormGroup>
)

export default RadioGroup
