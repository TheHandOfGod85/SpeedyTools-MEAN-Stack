import { createReducer } from '@ngrx/store'

export interface AuthState {}

const initialstate: AuthState = {}

export const authState = createReducer<AuthState>(initialstate)
