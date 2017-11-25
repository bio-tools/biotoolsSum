import React from 'react'
import { Col, FormGroup } from 'react-bootstrap'

const Checkbox = ({ input, label }) => (
  <FormGroup>
    <Col smOffset={2} sm={10}>
      <div style={{ marginRight: 0 }} className='pretty p-icon p-smooth p-round p-bigger'>
        <input
          type='checkbox'
          checked={!!input.value}
          onChange={input.onChange}
        />
        <div className='state p-success'>
          <i className='icon fa fa-check' aria-hidden='true' />
          <label>{label}</label>
        </div>
      </div>
    </Col>
  </FormGroup>
)

export default Checkbox
