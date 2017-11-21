import { createSelector } from 'reselect'

export const getUi = appState => appState.ui

export const showReportPage = createSelector(
  getUi,
  uiState => uiState.showReportPage
)
