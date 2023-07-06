import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppSate from './../../state/app.state';
import { SharedState } from './shared.reducer';

export interface State extends AppSate.State {
  shared: SharedState;
}

const getSharedFeatureState = createFeatureSelector<SharedState>('shared');

export const setIsLoading = createSelector(
  getSharedFeatureState,
  (state) => state.isLoading
);
