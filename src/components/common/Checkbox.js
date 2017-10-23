import React from 'react'
import { Checkbox as BootstrapCheckbox, Col, FormGroup } from 'react-bootstrap'

const Checkbox = ({ input, label }) => (
  <FormGroup>
    <Col smOffset={2} sm={10}>
      <BootstrapCheckbox
        checked={!!input.value}
        onChange={input.onChange}
      >
        {label}
      </BootstrapCheckbox>
    </Col>
  </FormGroup>
)

export default Checkbox
