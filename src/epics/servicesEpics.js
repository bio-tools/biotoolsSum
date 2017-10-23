import Rx from 'rxjs'
import { saveAs } from 'file-saver'
import jsdocx from 'jsdocx'

import * as ActionTypes from '../constants/actionTypes'
import { serverIsDown } from './configureEpics'
import { getServices, updatedData } from '../biotoolsSum/services/index'
import buildActionWithName from '../helpers/buildActionWithName'
import buildAction from '../helpers/buildAction'
import * as R from 'ramda'
import * as XLSX from 'xlsx'
import { fileType } from '../constants/generateFile'

export const fetchServicesEpic = (action$, { getState }) =>
  action$.ofType(ActionTypes.SERVICES_FETCH)
    .concatMap(({ payload: { name, query } }) => Rx.Observable
      .fromPromise(getServices(query))
      .map((service) => buildActionWithName(ActionTypes.SERVICES_FETCH_SUCCESS, {service, name}))
      .retry(3)
      .catch(serverIsDown)
      .catch(() => Rx.Observable.of(buildAction(ActionTypes.SERVICES_FETCH_FAILURE))))

export const fetchCitationsEpic = (action$) =>
  action$.ofType(ActionTypes.SERVICES_FETCH_SUCCESS)
    .concatMap(({ payload: { service, name } }) => Rx.Observable
      .combineLatest(updatedData(service.list))
      .map(tools => {
        const updatedService = R.assoc('list', tools, service)
        return buildActionWithName(ActionTypes.CITATIONS_FETCH_SUCCESS, { updatedService, name })
      })
      .retry(3)
      .catch(serverIsDown)
      .catch(() => Rx.Observable.of(buildAction(ActionTypes.CITATIONS_FETCH_FAILURE)))
    )

function generateDocx (doc, data, title) {
  let titleRun = doc.addParagraph().addRun()
  titleRun.addText(title)
  let titleFormat = titleRun.addFormat()
  titleFormat.addFonts().setAscii('Calibri')
  titleFormat.addBold()
  // Empty line
  titleRun.addBreak()

  data.forEach(item => {
    // Name
    let nameRun = doc.addParagraph().addRun()
    nameRun.addText(item.name)
    let nameFormat = nameRun.addFormat()
    nameFormat.addFonts().setAscii('Calibri')
    nameFormat.addBold()

    // Institute BEGIN
    let instituteParagraph = doc.addParagraph()
    // Institute title
    let instituteTitleRun = instituteParagraph.addRun()
    instituteTitleRun.addText('Institute: ')
    let instituteTitleFormat = instituteTitleRun.addFormat()
    instituteTitleFormat.addFonts().setAscii('Calibri')
    instituteTitleFormat.addBold()
    // Institute text
    let instituteTextRun = instituteParagraph.addRun()
    item.credit.forEach((instituteItem, index) =>
      index + 1 < item.credit.length
        ? instituteTextRun.addText(`${instituteItem.name}; `)
        : instituteTextRun.addText(`${instituteItem.name}.`)
    )
    let instituteTextFormat = instituteTextRun.addFormat()
    instituteTextFormat.addFonts().setAscii('Calibri')
    // Institute END

    // Description BEGIN
    let descriptionParagraph = doc.addParagraph()
    // Description title
    let descriptionTitleRun = descriptionParagraph.addRun()
    descriptionTitleRun.addText('Description: ')
    let descriptionTitleFormat = descriptionTitleRun.addFormat()
    descriptionTitleFormat.addFonts().setAscii('Calibri')
    descriptionTitleFormat.addBold()
    // Description text
    let descriptionTextRun = descriptionParagraph.addRun()
    descriptionTextRun.addText(item.description)
    let descriptionTextFormat = descriptionTextRun.addFormat()
    descriptionTextFormat.addFonts().setAscii('Calibri')
    // Description END

    // Publications BEGIN
    if (item.publicationStrings && item.publicationStrings.length > 0) {
      let publicationParagraph = doc.addParagraph()
      // Publications title
      let publicationTitleRun = publicationParagraph.addRun()
      publicationTitleRun.addText('Publications: ')
      let publicationsTitleFormat = publicationTitleRun.addFormat()
      publicationsTitleFormat.addFonts().setAscii('Calibri')
      publicationsTitleFormat.addBold()
      // Publications text
      item.publicationStrings.forEach((publicationString) => {
        const publicationsTextRun = doc.addParagraph().addRun()
        publicationsTextRun.addFormat().addFonts().setAscii('Calibri')
        return publicationsTextRun.addText(`${publicationString} `)
      })
    }
    // Publication END

    // Citations BEGIN
    if (item.citations) {
      let citationsParagraph = doc.addParagraph()
      // Citations title
      let citationsTitleRun = citationsParagraph.addRun()
      citationsTitleRun.addText('Total citations: ')
      let citationsTitleFormat = citationsTitleRun.addFormat()
      citationsTitleFormat.addFonts().setAscii('Calibri')
      citationsTitleFormat.addBold()
      // Citations text
      let citationsTextRun = citationsParagraph.addRun()
      citationsTextRun.addText(item.citations)
      let citationsTextFormat = citationsTextRun.addFormat()
      citationsTextFormat.addFonts().setAscii('Calibri')
    }
    // Citations END

    // Empty line
    doc.addParagraph().addRun().addBreak()
  })
}

function s2ab (s) {
  let buf = new ArrayBuffer(s.length)
  let view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

function generateXlsx (data) {
  let workSheet = XLSX.utils.json_to_sheet(data)

  let workBook = { SheetNames: ['sheet1'], Sheets: { 'sheet1': workSheet } }

  /* bookType can be any supported output type */
  const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' }

  const wbout = XLSX.write(workBook, wopts)

  /* the saveAs call downloads a file on the local machine */
  saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'generated.xlsx')
}

const byAttribute = (attribute, order) => order && order === 'ascend'
  ? R.ascend(R.prop(attribute))
  : R.descend(R.prop(attribute))

export const generateFile = (action$, {getState}) => {
  return action$.ofType(ActionTypes.GENERATE_FILE)
    .switchMap(({payload: {list}}) => {
      const {form: {fileGenerationForm: {values}}} = getState()
      console.log('document form', values)

      if (values.fileType === fileType.JPG) {

      } else {
        const restructuredListOfTools = R.compose(
          R.take(values.takeFirstX),
          R.sort(byAttribute(values.sortBy, values.order), R.__),
        )(list)

        if (values.fileType === fileType.DOCX) {
          let doc = new jsdocx.Document()
          let listOfTools = restructuredListOfTools

          if (values.database) {
            listOfTools = R.compose(
              R.filter(R.compose(
                R.not,
                R.contains('Database portal'),
                R.prop('toolType'),
              )),
            )(restructuredListOfTools)

            const listOfDatabases = R.compose(
              R.filter(R.compose(
                R.contains('Database portal'),
                R.prop('toolType'),
              )),
            )(restructuredListOfTools)

            generateDocx(doc, listOfDatabases, 'Databases')
          }

          generateDocx(doc, listOfTools, 'Tools')

          doc.generate().then((content) => {
            saveAs(content, 'generated.docx')
          })
        } else if (values.fileType === fileType.XLSX) {
          let includedProps = R.map(R.pick(['name', 'citations', 'credit', 'description']), restructuredListOfTools)
          if (!values.includeProps.includes('includeDescription')) {
            includedProps = R.map(R.omit(['description']), includedProps)
          }
          if (!values.includeProps.includes('includeCitations')) {
            includedProps = R.map(R.omit(['citations']), includedProps)
          }
          if (!values.includeProps.includes('includeInstitute')) {
            includedProps = R.map(R.omit(['credit']), includedProps)
          } else {
            console.log('include props', includedProps)
            includedProps = R.map(R.evolve({
              credit: R.compose(
                R.join('\n'),
                R.pluck('name'),
              ),
            }), includedProps)
          }

          console.log('wot', includedProps)

          generateXlsx(includedProps)
        }
      }

      return Rx.Observable.of()
    })
}

export default [
  fetchCitationsEpic,
  fetchServicesEpic,
  generateFile,
]
