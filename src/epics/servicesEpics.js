import 'babel-polyfill'
import Rx from 'rxjs'
import * as R from 'ramda'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import jsdocx from 'jsdocx'
import * as ActionTypes from '../constants/actionTypes'
import { serverIsDown } from './configureEpics'
import { getServices, orderByAttributeAndTakeFirstX, updatedData } from '../biotoolsSum/services/index'
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

    // Tool type BEGIN
    if (includeProps.includes('toolType') && item.toolType && item.toolType.length > 0) {
      let toolTypeParagraph = doc.addParagraph()
      // Tool type title
      let toolTypeTitleRun = toolTypeParagraph.addRun()
      toolTypeTitleRun.addText('Tool type: ')
      let toolTypeTitleFormat = toolTypeTitleRun.addFormat()
      toolTypeTitleFormat.addFonts().setAscii('Calibri')
      toolTypeTitleFormat.addBold()
      // Tool type text
      let toolTypeTextRun = toolTypeParagraph.addRun()
      item.toolType.forEach((toolTypeItem, index) =>
        index + 1 < item.toolType.length
          ? toolTypeTextRun.addText(`${toolTypeItem}, `)
          : toolTypeTextRun.addText(`${toolTypeItem}.`)
      )
      let toolTypeTextFormat = toolTypeTextRun.addFormat()
      toolTypeTextFormat.addFonts().setAscii('Calibri')
    }
    // Tool type END

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
    if (includeProps.includes('publication')) {
      const publicationParagraph = doc.addParagraph()
      // Publications title
      const publicationTitleRun = publicationParagraph.addRun()
      publicationTitleRun.addText('Publications: ')
      const publicationsTitleFormat = publicationTitleRun.addFormat()
      publicationsTitleFormat.addFonts().setAscii('Calibri')
      publicationsTitleFormat.addBold()
      // Publications text
      if (item.publicationsStrings && item.publicationsStrings.length > 0) {
        item.publicationsStrings.forEach((publicationString) => {
          const publicationsTextRun = doc.addParagraph().addRun()
          publicationsTextRun.addFormat().addFonts().setAscii('Calibri')
          return publicationsTextRun.addText(publicationString)
        })
      } else {
        const publicationsTextRun = publicationParagraph.addRun()
        publicationsTextRun.addFormat().addFonts().setAscii('Calibri')
        publicationsTextRun.addText('No publications')
      }
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
      citationsTextRun.addText(`${item.citations}.`)
      let citationsTextFormat = citationsTextRun.addFormat()
      citationsTextFormat.addFonts().setAscii('Calibri')
    }
    // Citations END

    // Topic BEGIN
    if (includeProps.includes('topic') && item.topic && item.topic.length > 0) {
      let topicParagraph = doc.addParagraph()
      // Topic title
      let topicTitleRun = topicParagraph.addRun()
      topicTitleRun.addText('Topic: ')
      let topicTitleFormat = topicTitleRun.addFormat()
      topicTitleFormat.addFonts().setAscii('Calibri')
      topicTitleFormat.addBold()
      // Topic text
      let topicTextRun = topicParagraph.addRun()
      item.topic.forEach((topicItem, index) =>
        index + 1 < item.topic.length
          ? topicTextRun.addText(`${topicItem.term}, `)
          : topicTextRun.addText(`${topicItem.term}.`)
      )
      let topicTextFormat = topicTextRun.addFormat()
      topicTextFormat.addFonts().setAscii('Calibri')
    }
    // Topic END

    // Topic BEGIN
    if (includeProps.includes('function') && item.function && item.function.length > 0) {
      let functionParagraph = doc.addParagraph()
      // Topic title
      let functionTitleRun = functionParagraph.addRun()
      functionTitleRun.addText('Function: ')
      let functionTitleFormat = functionTitleRun.addFormat()
      functionTitleFormat.addFonts().setAscii('Calibri')
      functionTitleFormat.addBold()
      // Topic text
      let functionTextRun = functionParagraph.addRun()
      item.function.forEach((functionItem, index) =>
        index + 1 < item.function.length
          ? functionTextRun.addText(`${functionItem.term}, `)
          : functionTextRun.addText(`${functionItem.term}.`)
      )
      let functionTextFormat = functionTextRun.addFormat()
      functionTextFormat.addFonts().setAscii('Calibri')
    }
    // Topic END

    // Maturity BEGIN
    if (includeProps.includes('maturity') && item.maturity) {
      let maturityParagraph = doc.addParagraph()
      // Maturity title
      let maturityTitleRun = maturityParagraph.addRun()
      maturityTitleRun.addText('Maturity: ')
      let maturityTitleFormat = maturityTitleRun.addFormat()
      maturityTitleFormat.addFonts().setAscii('Calibri')
      maturityTitleFormat.addBold()
      // Maturity text
      let maturityTextRun = maturityParagraph.addRun()
      maturityTextRun.addText(`${item.maturity}.`)
      let maturityTextFormat = maturityTextRun.addFormat()
      maturityTextFormat.addFonts().setAscii('Calibri')
    }
    // Maturity END

    // Platform BEGIN
    if (includeProps.includes('platform') && item.operatingSystem && item.operatingSystem.length > 0) {
      let platformParagraph = doc.addParagraph()
      // Platform title
      let platformTitleRun = platformParagraph.addRun()
      platformTitleRun.addText('Platform: ')
      let platformTitleFormat = platformTitleRun.addFormat()
      platformTitleFormat.addFonts().setAscii('Calibri')
      platformTitleFormat.addBold()
      // Platform text
      let platformTextRun = platformParagraph.addRun()
      item.operatingSystem.forEach((osItem, index) =>
        index + 1 < item.operatingSystem.length
          ? platformTextRun.addText(`${osItem}, `)
          : platformTextRun.addText(`${osItem}.`)
      )
      let platformTextFormat = platformTextRun.addFormat()
      platformTextFormat.addFonts().setAscii('Calibri')
    }
    // Platform END

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

export const generateFile = (action$, { getState }) => {
  return action$.ofType(ActionTypes.GENERATE_FILE)
    .switchMap(({ payload: { list } }) => {
      const { form: { fileGenerationForm: { values } } } = getState()
      if (values.fileType === fileType.JPG) {
        // for now nothing here
      } else if (values.fileType === fileType.DOCX) {
        let doc = new jsdocx.Document()
        let listOfTools = R.map(
          R.pick(
            ['name', 'credit', 'description', 'publicationsStrings', 'citations',
              'toolType', 'topic', 'function', 'maturity', 'operatingSystem']
          ), list)

        if (values.database) {
          listOfTools = R.compose(
            R.filter(R.compose(
              R.not,
              R.contains('Database portal'),
              R.prop('toolType'),
            )),
          )(list)

          const listOfDatabases = R.compose(
            R.filter(R.compose(
              R.contains('Database portal'),
              R.prop('toolType'),
            )),
          )(list)

          generateDocx(doc, listOfDatabases, values.includeProps, 'Databases')
        }

        generateDocx(doc, listOfTools, values.includeProps, 'Tools')

        doc.generate().then((content) => {
          saveAs(content, 'generated.docx')
        })
      } else if (values.fileType === fileType.XLSX) {
        let pickedListOfTools = R.map(
          R.pick(
            ['name', 'credit', 'description', 'publicationsStrings', 'citations',
              'toolType', 'topic', 'function', 'maturity', 'operatingSystem']
          ), list)

        pickedListOfTools = R.map(tool => R.compose(
          R.dissoc('name'),
          R.assoc('Name', tool.name),
        )(tool), pickedListOfTools)

        if (!values.includeProps.includes('toolType')) {
          pickedListOfTools = R.map(R.omit(['toolType']), pickedListOfTools)
        } else {
          pickedListOfTools = R.map(tool => R.compose(
            R.dissoc('toolType'),
            R.assoc('Tool type', R.join(', ', tool.toolType)),
          )(tool), pickedListOfTools)
        }

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
          pickedListOfTools = R.map(R.omit(['publicationsStrings']), pickedListOfTools)
        } else {
          pickedListOfTools = R.map(tool => R.compose(
            R.dissoc('publicationsStrings'),
            R.assoc('Publications', R.join('\n ', tool.publicationsStrings || [])),
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

        if (!values.includeProps.includes('topic')) {
          pickedListOfTools = R.map(R.omit(['topic']), pickedListOfTools)
        } else {
          pickedListOfTools = R.map(tool => R.compose(
            R.dissoc('topic'),
            R.assoc('Topic', R.join(', ', R.pluck('term', tool.topic))),
          )(tool), pickedListOfTools)
        }

        if (!values.includeProps.includes('function')) {
          pickedListOfTools = R.map(R.omit(['function']), pickedListOfTools)
        } else {
          pickedListOfTools = R.map(tool => R.compose(
            R.dissoc('function'),
            R.assoc('Function', R.join(', ', R.pluck('term', tool.function))),
          )(tool), pickedListOfTools)
        }

        if (!values.includeProps.includes('maturity')) {
          pickedListOfTools = R.map(R.omit(['maturity']), pickedListOfTools)
        } else {
          pickedListOfTools = R.map(tool => R.compose(
            R.dissoc('maturity'),
            R.assoc('Maturity', tool.maturity),
          )(tool), pickedListOfTools)
        }

        if (!values.includeProps.includes('platform')) {
          pickedListOfTools = R.map(R.omit(['platform']), pickedListOfTools)
        } else {
          pickedListOfTools = R.map(tool => R.compose(
            R.dissoc('operatingSystem'),
            R.assoc('Platform', R.join(', ', tool.operatingSystem)),
          )(tool), pickedListOfTools)
        }

        generateXlsx(pickedListOfTools)
      }

      return Rx.Observable.of()
    })
}

export default [
  fetchCitationsEpic,
  fetchServicesEpic,
  generateFile,
]
