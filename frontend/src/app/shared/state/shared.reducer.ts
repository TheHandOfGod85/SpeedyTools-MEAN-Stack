import { createReducer } from '@ngrx/store'

export interface SharedState {}

const initialState: SharedState = {}

export const sharedReducer = createReducer<SharedState>(initialState)
