import React from 'react'
import { Col, ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

const SingleInput = ({ label, input, ...props }) => (
  <FormGroup>
    <Col componentClass={ControlLabel} sm={2}>
      {label}
    </Col>
    <Col sm={10}>
      <FormControl {...input} />
    </Col>
  </FormGroup>
)

export default SingleInput
