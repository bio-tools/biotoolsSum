import React from 'react'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import buildActionCreators from '../../helpers/buildActionCreators'
import * as ActionTypes from '../../constants/actionTypes'
import { connect } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import NavbarTextField from '../common/NavbarTextField'
import { isLoadingInProgress } from '../../selectors/servicesSelector'
import { getServicesNames } from '../../common/helperFunctions'
import OverlayTooltip from '../common/OverlayTooltip'

class NavbarForm extends React.PureComponent {
  setCollection = event => {
    event.preventDefault()
    const { setCollection, enteredCollection, isLoadingInProgress } = this.props
    if (!isLoadingInProgress) {
      setCollection({collection: enteredCollection, userEnteredCollection: true})
    }
  }

  render () {
    const { submitting, isLoadingInProgress } = this.props

    return (
      <Form onSubmit={this.setCollection}>
        <Field name='enteredCollection' component={NavbarTextField} placeholder='Enter collection' />
        {' '}
        {submitting || isLoadingInProgress
          ? <OverlayTooltip id='no-submit-tooltip' tooltipText='Loading in progress...' placement='right'>
            <Button type='submit' disabled>{'Submit'}</Button>
          </OverlayTooltip>
          : <Button type='submit'>{'Submit'}</Button>
        }
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
    isLoadingInProgress: isLoadingInProgress(state, getServicesNames),
    enteredCollection: selector(state, 'enteredCollection'),
    initialValues: { enteredCollection: '' },
  }
}, buildActionCreators({
  setCollection: ActionTypes.SET_COLLECTION,
}))(NavbarForm)
