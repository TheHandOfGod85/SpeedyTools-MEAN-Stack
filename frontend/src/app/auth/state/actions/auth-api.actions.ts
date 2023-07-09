import { createAction, props } from '@ngrx/store'
import { User } from '../../models/user.model'

export const loginSuccess = createAction(
    '[Auth API] Login Success',
    props<{ user: User }>()
)
export const loginFailure = createAction(
    '[Auth API] Login Failure',
    props<{ error: string }>()
)
