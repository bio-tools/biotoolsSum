import React from 'react'
import {Radio} from 'react-bootstrap'

const SingleRadio = ({ label, input, ...props }) => (
  <Radio inline {...input} {...props}>
    {label}
  </Radio>
)

export default SingleRadio
