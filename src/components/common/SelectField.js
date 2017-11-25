import React from 'react'
import { Col, ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

const SelectField = ({ label, children, input }) => (
  <FormGroup controlId={input.name}>
    <Col componentClass={ControlLabel} sm={2}>
      {label}
    </Col>
    <Col sm={10}>
      <FormControl componentClass='select' {...input}>
        {children}
      </FormControl>
    </Col>
  </FormGroup>
)

export default SelectField
