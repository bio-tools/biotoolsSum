import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class FormContainer extends Component {
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div className='columns'>
        <div className='column col-9 col-sm-12 centered'>
          <form className='form-horizontal' onSubmit={handleSubmit}>
            <div className='form-group'>
              <div className='col-2'>
                <label className='form-label'>Search everything</label>
              </div>
              <div className='col-10'>
                <Field
                  name='q'
                  type='text'
                  component='input'
                  placeholder='Matches all attributes (e.g. "protein signal peptide detection")'
                  className='form-input' />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-2'>
                <label className='form-label'>Topic</label>
              </div>
              <div className='col-10'>
                <Field
                  name='topic'
                  type='text'
                  component='input'
                  placeholder='Topic (e.g. "DNA")'
                  className='form-input' />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-2'>
                <label className='form-label'>Collection</label>
              </div>
              <div className='col-10'>
                <Field
                  name='collectionID'
                  type='text'
                  component='input'
                  placeholder='Collection (e.g. "ELIXIR-CZ")'
                  className='form-input' />
              </div>
            </div>
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
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(FormContainer)
