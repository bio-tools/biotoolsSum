import React from 'react'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import buildActionCreators from '../../helpers/buildActionCreators'
import * as ActionTypes from '../../constants/actionTypes'
import { connect } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import NavbarTextField from '../common/NavbarTextField'

class NavbarForm extends React.PureComponent {
  setCollection = event => {
    event.preventDefault()
    const { setCollection, enteredCollection } = this.props
    setCollection({ collection: enteredCollection, userEnteredCollection: true })
  }

  render () {
    const { submitting } = this.props

    return (
      <Form onSubmit={this.setCollection}>
        <Field name='enteredCollection' component={NavbarTextField} placeholder='Enter collection' />
        {' '}
        <Button type='submit' disabled={submitting}>{'Submit'}</Button>
      </Form>
    )
  }
}

NavbarForm = reduxForm({
  form: 'collectionForm',
})(NavbarForm)

export default connect(state => {
  const selector = formValueSelector('collectionForm')

  return {
    enteredCollection: selector(state, 'enteredCollection'),
    initialValues: { enteredCollection: '' },
  }
}, buildActionCreators({
  setCollection: ActionTypes.SET_COLLECTION,
}))(NavbarForm)
