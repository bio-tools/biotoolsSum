import { createSelector } from 'reselect'

export const getCollectionState = appState => appState.collection

export const getActiveCollection = createSelector(
  getCollectionState,
  uiState => uiState.activeCollection
)

export const getUserEnteredCollection = createSelector(
  getCollectionState,
  uiState => uiState.userEnteredCollection
)
