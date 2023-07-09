import { createAction, props } from '@ngrx/store'

export const login = createAction(
    '[Auth Page] Login',
    props<{ email: string; password: string }>()
)
