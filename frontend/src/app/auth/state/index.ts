import { createFeatureSelector } from '@ngrx/store'
import * as AppSate from './../../state/app.state'
import { AuthState } from './auth.reducer'
export interface State extends AppSate.State {
    auth: AuthState
}

const getAuthFeatureState = createFeatureSelector<AuthState>('auth')
