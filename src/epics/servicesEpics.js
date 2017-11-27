import 'babel-polyfill'
import Rx from 'rxjs'
import * as R from 'ramda'
import * as ActionTypes from '../constants/actionTypes'
import { serverIsDown } from './configureEpics'
import { getServices, updatedData } from '../biotoolsSum/services/index'
import buildActionWithName from '../helpers/buildActionWithName'
import buildAction from '../helpers/buildAction'
import { reportType } from '../constants/generateFile'
import { generateDocx, generateXlsx } from '../biotoolsSum/generation/index'

export const fetchServicesEpic = (action$, { getState }) =>
  action$.ofType(ActionTypes.SERVICES_FETCH)
    .concatMap(({ payload: { name, query } }) => Rx.Observable
      .fromPromise(getServices(query))
      .map((service) => buildActionWithName(ActionTypes.SERVICES_FETCH_SUCCESS, { service, name }))
      .retry(3)
      .catch(serverIsDown)
      .catch(() => Rx.Observable.of(buildAction(ActionTypes.SERVICES_FETCH_FAILURE))))

export const fetchCitationsEpic = (action$) =>
  action$.ofType(ActionTypes.SERVICES_FETCH_SUCCESS, ActionTypes.CITATIONS_FETCH)
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

export const generateFile = (action$, { getState }) => {
  return action$.ofType(ActionTypes.GENERATE_FILE)
    .switchMap(({ payload: { list } }) => {
      const { form: { fileGenerationForm: { values } } } = getState()
      if (values.reportType === reportType.DOCX) {
        let pickedListOfTools = R.map(
          R.pick(
            ['name', 'credit', 'description', 'publicationsStrings', 'citations',
              'toolType', 'topic', 'function', 'maturity', 'operatingSystem']
          ), list)

        generateDocx(pickedListOfTools, values.includeProps)
      } else if (values.reportType === reportType.XLSX) {
        let pickedListOfTools = R.map(
          R.pick(
            ['name', 'credit', 'description', 'publicationsStrings', 'citations',
              'toolType', 'topic', 'function', 'maturity', 'operatingSystem']
          ), list)

        generateXlsx(pickedListOfTools, values)
      }

      return Rx.Observable.of()
    })
}

export default [
  fetchCitationsEpic,
  fetchServicesEpic,
  generateFile,
]
