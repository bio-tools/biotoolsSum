import React from 'react'
import { Col, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap'

const TextField = ({ label, help, input }) => (
  <FormGroup controlId={input.name}>
    <Col componentClass={ControlLabel} sm={2}>
      {label}
    </Col>
    <Col sm={10}>
      <FormControl {...input} />
    </Col>
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
)

export default TextField
