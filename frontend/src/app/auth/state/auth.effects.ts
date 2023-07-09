import { catchError, concatMap, map, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthApiActions, AuthPageActions } from './actions'
import { HttpErrorResponse } from '@angular/common/http'
@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private _snackbar: MatSnackBar
    ) {}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthPageActions.login),
            concatMap((action) => {
                return this.authService
                    .login(action.email, action.password)
                    .pipe(
                        map((result) =>
                            AuthApiActions.loginSuccess({
                                user: result.data.user
                            })
                        ),
                        catchError((error: HttpErrorResponse) => {
                            return of(
                                AuthApiActions.loginFailure({
                                    error: error.error.message
                                })
                            )
                        })
                    )
            })
        )
    })
}
