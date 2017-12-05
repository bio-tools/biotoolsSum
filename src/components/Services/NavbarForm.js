import React from 'react'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import buildActionCreators from '../../helpers/buildActionCreators'
import * as ActionTypes from '../../constants/actionTypes'
import { connect } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import NavbarTextField from '../common/NavbarTextField'
import { getActiveCollection } from '../../selectors/collectionSelector'

class NavbarForm extends React.PureComponent {
  setCollection = event => {
    event.preventDefault()
    const { setCollection, servicesAndCitationsFetchCancel, enteredCollection, activeCollection } = this.props
    if (activeCollection !== enteredCollection) {
      servicesAndCitationsFetchCancel()
      setCollection({collection: enteredCollection, userEnteredCollection: true})
    }
  }

  render () {
    return (
      <Form onSubmit={this.setCollection}>
        <Field name='enteredCollection' component={NavbarTextField} placeholder='Enter collection' />
        {' '}
        <Button type='submit'>{'Submit'}</Button>
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
    activeCollection: getActiveCollection(state),
  }
}, buildActionCreators({
  servicesAndCitationsFetchCancel: ActionTypes.SERVICES_AND_CITATIONS_FETCH_CANCEL,
  setCollection: ActionTypes.SET_COLLECTION,
}))(NavbarForm)
