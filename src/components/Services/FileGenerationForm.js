import React from 'react'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import buildActionCreators from '../../helpers/buildActionCreators'
import * as ActionTypes from '../../constants/actionTypes'
import { connect } from 'react-redux'
import { reportType } from '../../constants/generateFile'
import SelectField from '../common/SelectField'
import { Button, Col, Form, FormGroup, ToggleButton } from 'react-bootstrap'
import ToggleRadioButtonGroup from '../common/ToggleRadioButtonGroup'
import TextField from '../common/TextField'
import ToggleCheckboxButtonGroup from '../common/ToggleCheckboxButtonGroup'
import Checkbox from '../common/Checkbox'

class FileGenerationForm extends React.PureComponent {
  generateFile = event => {
    event.preventDefault()
    const { generateFile, list } = this.props
    generateFile({ list })
  }

  render () {
    const { reset, submitting, reportTypeChosen, sortByChosen, orderChosen, includePropsChosen } = this.props

    return (
      <Form horizontal onSubmit={this.generateFile}>
        <Field name='reportType' component={SelectField} label='Choose type of report' >
          <option value={reportType.DOCX}>{'DOCX tools report'}</option>
          <option value={reportType.XLSX}>{'XLSX tools report'}</option>
          <option value={reportType.CHART}>{'Citations chart'}</option>
        </Field>
        {reportTypeChosen === reportType.CHART
          ? <Field name='createGraph' component={Checkbox} label='I want to create my own graph by selecting tools' />
          : <div>
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
          </div>
        }
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
    reportTypeChosen: selector(state, 'reportType'),
    sortByChosen: selector(state, 'sortBy'),
    orderChosen: selector(state, 'order'),
    includePropsChosen: selector(state, 'includeProps'),
    initialValues: { reportType: 'docx', sortBy: 'citations', order: 'descend', includeProps: [] },
  }
}, buildActionCreators({
  generateFile: ActionTypes.GENERATE_FILE,
}))(FileGenerationForm)
