import { User } from './../models/user.model'
import { createReducer, on } from '@ngrx/store'
import { AuthApiActions, AuthPageActions } from './actions'

export interface AuthState {
    user: User
    isLoading: boolean
    error: string
}

const initialstate: AuthState = {
    user: null,
    isLoading: false,
    error: ''
}

export const authReducer = createReducer<AuthState>(
    initialstate,
    on(AuthPageActions.login, (state, action): AuthState => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(AuthApiActions.loginSuccess, (state, action): AuthState => {
        return {
            ...state,
            user: action.user,
            error: '',
            isLoading: false
        }
    }),
    on(AuthApiActions.loginFailure, (state, action): AuthState => {
        return {
            ...state,
            error: action.error,
            isLoading: false,
            user: null
        }
    })
)
