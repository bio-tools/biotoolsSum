import React from 'react'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import buildActionCreators from '../../helpers/buildActionCreators'
import * as ActionTypes from '../../constants/actionTypes'
import { connect } from 'react-redux'
import { fileType } from '../../constants/generateFile'
import SelectField from '../common/SelectField'
import Checkbox from '../common/Checkbox'
import { Button, Col, Form, FormGroup, Row, ToggleButton } from 'react-bootstrap'
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
    const { reset, submitting, fileTypeChosen, sortByChosen, orderChosen, includePropsChosen } = this.props

    return (
      <Form horizontal onSubmit={this.generateFile}>
        <Field name='fileType' component={SelectField} label='Choose file type' >
          <option value={fileType.DOCX}>{'DOCX'}</option>
          <option value={fileType.XLSX}>{'XLSX'}</option>
        </Field>
        <Field name='sortBy' component={ToggleRadioButtonGroup} valueChosen={sortByChosen} label='Sort by' >
          <ToggleButton value='citations'>{'Citations'}</ToggleButton>
          <ToggleButton value='name'>{'Name'}</ToggleButton>
        </Field>
        <Field name='order' component={ToggleRadioButtonGroup} valueChosen={orderChosen} label='Order' >
          <ToggleButton value='descend'>{'Descending'}</ToggleButton>
          <ToggleButton value='ascend'>{'Ascending'}</ToggleButton>
        </Field>
        <Field name='takeFirstX' component={TextField} label='Number of tools' />
        <Field name='includeProps' component={ToggleCheckboxButtonGroup} valueChosen={includePropsChosen} label='Include'>
          <ToggleButton value='toolType'>{'Tool type'}</ToggleButton>
          <ToggleButton value='institute'>{'Institute'}</ToggleButton>
          <ToggleButton value='description'>{'Description'}</ToggleButton>
          <ToggleButton value='publication'>{'Publications'}</ToggleButton>
          <ToggleButton value='citations'>{'Citations'}</ToggleButton>
          <ToggleButton value='topic'>{'Topic'}</ToggleButton>
          <ToggleButton value='function'>{'Function'}</ToggleButton>
          <ToggleButton value='maturity'>{'Maturity'}</ToggleButton>
          <ToggleButton value='platform'>{'Platform'}</ToggleButton>
        </Field>
        {fileTypeChosen === fileType.DOCX &&
        <Field name='database' component={Checkbox} label='Split databases and other tools' />
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
    sortByChosen: selector(state, 'sortBy'),
    orderChosen: selector(state, 'order'),
    includePropsChosen: selector(state, 'includeProps'),
    initialValues: { fileType: 'docx', sortBy: 'citations', order: 'descend', includeProps: [] },
  }
}, buildActionCreators({
  generateFile: ActionTypes.GENERATE_FILE,
}))(FileGenerationForm)
