import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {Button, Col, Form, FormGroup, Radio} from 'react-bootstrap'
import SingleInput from '../../Inputs/SingleInput'
import RadioGroup from '../../Inputs/RadioGroup'
import Select from '../../Inputs/Select'
import SingleRadio from '../../Inputs/SingleRadio'

class FormContainer extends Component {
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <Col md={10} sm={12}>
        <Form horizontal onSubmit={handleSubmit}>
          <Field
            name='q'
            component={SingleInput}
            label='Query term'
            type='text'
            placeholder='query term' />
          <Field
            name='topic'
            component={SingleInput}
            label='Topic'
            type='text'
            placeholder='Topic (e.g. "DNA")' />
          <Field
            name='collectionID'
            component={SingleInput}
            label='Collection'
            type='text'
            placeholder='Collection (e.g. "ELIXIR-CZ")' />
          <Field name='sort' component={Select} tape='' label='Sort by'>
            <option value='' />
            <option value='lastUpdate'>Updated</option>
            <option value='additionDate'>Added</option>
            <option value='name'>Name</option>
          </Field>
          <RadioGroup label='Order'>
            <Field name='ord' component={SingleRadio} type='radio' value='asc' label='Ascending' />
            <Field name='ord' component={SingleRadio} type='radio' value='desc' label='Descending' />
          </RadioGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type='submit'
                className='btn btn-primary'
                disabled={pristine || submitting}>
                  Submit
                </Button>
              <Button type='button'
                className='btn btn-link'
                disabled={pristine || submitting} onClick={reset}>
                  Clear Values
                </Button>
            </Col>
          </FormGroup>
        </Form>
      </Col>
    )
  }
}

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(FormContainer)
