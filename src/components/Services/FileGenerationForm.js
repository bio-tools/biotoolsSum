import React from 'react'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import buildActionCreators from '../../helpers/buildActionCreators'
import * as ActionTypes from '../../constants/actionTypes'
import { connect } from 'react-redux'
import { fileType } from '../../constants/generateFile'
import SelectField from '../common/SelectField'
import Checkbox from '../common/Checkbox'
import { Button, Col, Form, FormGroup, ToggleButton } from 'react-bootstrap'
import ToggleRadioButtonGroup from '../common/ToggleRadioButtonGroup'
import TextField from '../common/TextField'
import ToggleCheckboxButtonGroup from '../common/ToggleCheckboxButtonGroup'

class FileGenerationForm extends React.PureComponent {
  generateFile = event => {
    event.preventDefault()
    const { generateFile, list } = this.props
    generateFile({ list })
  }

  render () {
    const { reset, submitting, fileTypeChosen } = this.props

    return (
      <Form horizontal onSubmit={this.generateFile}>
        <Field name='fileType' component={SelectField} label='Choose file type' >
          <option value={fileType.DOCX}>{'DOCX'}</option>
          <option value={fileType.XLSX}>{'XLSX'}</option>
        </Field>
        <Field name='sortBy' component={SelectField} label='Sort by' >
          <option value='citations'>{'Citations'}</option>
          <option value='name'>{'Name'}</option>
        </Field>
        <Field name='order' component={ToggleRadioButtonGroup} label='Order' >
          <ToggleButton value='descend'>{'Descending'}</ToggleButton>
          <ToggleButton value='ascend'>{'Ascending'}</ToggleButton>
        </Field>
        <Field name='takeFirstX' component={TextField} label='Number of tools' />
        {fileTypeChosen === fileType.DOCX &&
          <Field name='database' component={Checkbox} label='Split databases and other tools' />
        }
        {fileTypeChosen === fileType.XLSX &&
          <Field name='includeProps' component={ToggleCheckboxButtonGroup} label='Include'>
            <ToggleButton value='includeCitations'>{'Citations'}</ToggleButton>
            <ToggleButton value='includeDescription'>{'Description'}</ToggleButton>
            <ToggleButton value='includeInstitute'>{'Institute'}</ToggleButton>
          </Field>
        }
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type='submit' disabled={submitting}>
              {'Generate'}
            </Button>
            <Button type='button' disabled={submitting} onClick={reset}>
              {'Clear Values'}
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

FileGenerationForm = reduxForm({
  form: 'fileGenerationForm',
})(FileGenerationForm)

export default connect(state => {
  const selector = formValueSelector('fileGenerationForm')

  return {
    fileTypeChosen: selector(state, 'fileType'),
    initialValues: { sortBy: 'citations', fileType: 'docx', includeProps: [] },
  }
}, buildActionCreators({
  generateFile: ActionTypes.GENERATE_FILE,
}))(FileGenerationForm)
