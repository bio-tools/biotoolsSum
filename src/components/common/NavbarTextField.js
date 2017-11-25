import React from 'react'
import { FormControl, FormGroup } from 'react-bootstrap'

const NavbarTextField = ({ placeholder, input }) => (
  <FormGroup>
    <FormControl type='text' placeholder={placeholder} {...input} />
  </FormGroup>
)

export default NavbarTextField
