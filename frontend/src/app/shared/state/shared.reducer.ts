import { createReducer } from '@ngrx/store';

export interface SharedState {
  isLoading: boolean;
}

const initialState: SharedState = {
  isLoading: false,
};

export const sharedReducer = createReducer<SharedState>(initialState);
