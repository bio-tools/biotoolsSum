import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {Col, Form} from 'react-bootstrap'
import SingleInput from '../../Inputs/SingleInput'

class FormContainer extends Component {
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div>
        <div className='columns'>
          <Col md={9} sm={12}>
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
              <div className='form-group'>
                <div className='col-2'>
                  <label className='form-label'>Order</label>
                </div>
                <div className='col-10'>
                  <label className='form-radio'>
                    <Field name='ord' component='input' type='radio' value='asc' />
                    <i className='form-icon' />
                    Ascending
                  </label>
                  <label className='form-radio'>
                    <Field name='ord' component='input' type='radio' value='desc' />
                    <i className='form-icon' />
                    Descending
                  </label>
                </div>
              </div>
              <div className='form-group'>
                <div className='col-2'>
                  <label className='form-label'>Sort by</label>
                </div>
                <div className='col-10'>
                  <Field name='sort' component='select' value='lastUpdate' className='form-select'>
                    <option />
                    <option value='lastUpdate'>Updated</option>
                    <option value='additionDate'>Added</option>
                    <option value='name'>Name</option>
                  </Field>
                </div>
              </div>
              <div className='form-group'>
                <button type='submit'
                  className='btn btn-primary'
                  disabled={pristine || submitting}>
                Submit
              </button>
                <button type='button'
                  className='btn btn-link'
                  disabled={pristine || submitting} onClick={reset}>
                Clear Values
              </button>
              </div>
            </Form>
          </Col>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(FormContainer)
