import 'babel-polyfill'
import Rx from 'rxjs'
import * as R from 'ramda'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import jsdocx from 'jsdocx'
import * as ActionTypes from '../constants/actionTypes'
import { serverIsDown } from './configureEpics'
import { getServices, updatedData } from '../biotoolsSum/services/index'
import buildActionWithName from '../helpers/buildActionWithName'
import buildAction from '../helpers/buildAction'
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

function generateDocx (doc, data, includeProps, title) {
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
    if (includeProps.includes('institute')) {
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
    }
    // Institute END

    // Description BEGIN
    if (includeProps.includes('description')) {
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
    }
    // Description END

    // Publications BEGIN
    if (includeProps.includes('publication') && item.publicationStrings && item.publicationStrings.length > 0) {
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
    if (includeProps.includes('citations') && item.citations) {
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
      const { form: { fileGenerationForm: { values } } } = getState()
      if (values.fileType === fileType.JPG) {
        // for now nothing here
      } else {
        const sortedAndOrderedListOfTools = R.compose(
          R.take(values.takeFirstX),
          R.sort(byAttribute(values.sortBy, values.order), R.__),
        )(list)

        if (values.fileType === fileType.DOCX) {
          let doc = new jsdocx.Document()
          let listOfTools = R.map(R.pick(['name', 'credit', 'description', 'publicationStrings', 'citations']), sortedAndOrderedListOfTools)

          if (values.database) {
            listOfTools = R.compose(
              R.filter(R.compose(
                R.not,
                R.contains('Database portal'),
                R.prop('toolType'),
              )),
            )(sortedAndOrderedListOfTools)

            const listOfDatabases = R.compose(
              R.filter(R.compose(
                R.contains('Database portal'),
                R.prop('toolType'),
              )),
            )(sortedAndOrderedListOfTools)

            generateDocx(doc, listOfDatabases, values.includeProps, 'Databases')
          }

          generateDocx(doc, listOfTools, values.includeProps, 'Tools')

          doc.generate().then((content) => {
            saveAs(content, 'generated.docx')
          })
        } else if (values.fileType === fileType.XLSX) {
          let pickedListOfTools = R.map(R.pick(['name', 'credit', 'description', 'publicationStrings', 'citations']), sortedAndOrderedListOfTools)

          if (!values.includeProps.includes('institute')) {
            pickedListOfTools = R.map(R.omit(['credit']), pickedListOfTools)
          } else {
            pickedListOfTools = R.map(tool => R.compose(
              R.dissoc('credit'),
              R.assoc('Institute', R.join('\n ', R.pluck('name', tool.credit))),
            )(tool), pickedListOfTools)
          }

          if (!values.includeProps.includes('description')) {
            pickedListOfTools = R.map(R.omit(['description']), pickedListOfTools)
          } else {
            pickedListOfTools = R.map(tool => R.compose(
              R.dissoc('description'),
              R.assoc('Description', tool.description),
            )(tool), pickedListOfTools)
          }

          if (!values.includeProps.includes('publication')) {
            pickedListOfTools = R.map(R.omit(['publicationStrings']), pickedListOfTools)
          } else {
            pickedListOfTools = R.map(tool => R.compose(
              R.dissoc('publicationStrings'),
              R.assoc('Publications', R.join('\n ', tool.publicationStrings || [])),
            )(tool), pickedListOfTools)
          }

          if (!values.includeProps.includes('citations')) {
            pickedListOfTools = R.map(R.omit(['citations']), pickedListOfTools)
          } else {
            pickedListOfTools = R.map(tool => R.compose(
              R.dissoc('citations'),
              R.assoc('Citations', tool.citations),
            )(tool), pickedListOfTools)
          }

          generateXlsx(pickedListOfTools)
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
