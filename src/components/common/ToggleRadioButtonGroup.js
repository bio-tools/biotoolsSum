import React from 'react'
import { Col, ControlLabel, FormGroup, ToggleButtonGroup } from 'react-bootstrap'

const ToggleRadioButtonGroup = ({ label, children, input }) => (
  <FormGroup>
    <Col componentClass={ControlLabel} sm={2}>
      {label}
    </Col>
    <Col sm={10}>
      <ToggleButtonGroup type='radio' name={input.name} onChange={input.onChange}>
        {children}
      </ToggleButtonGroup>
    </Col>
  </FormGroup>
)

export default ToggleRadioButtonGroup
