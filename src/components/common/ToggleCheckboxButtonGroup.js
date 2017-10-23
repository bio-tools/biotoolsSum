import React from 'react'
import { Col, ControlLabel, FormGroup, ToggleButtonGroup } from 'react-bootstrap'

const ToggleCheckboxButtonGroup = ({ label, children, input }) => (
  <FormGroup>
    <Col componentClass={ControlLabel} sm={2}>
      {label}
    </Col>
    <Col sm={10}>
      <ToggleButtonGroup type='checkbox' name={input.name} onChange={input.onChange}>
        {children}
      </ToggleButtonGroup>
    </Col>
  </FormGroup>
)

export default ToggleCheckboxButtonGroup
