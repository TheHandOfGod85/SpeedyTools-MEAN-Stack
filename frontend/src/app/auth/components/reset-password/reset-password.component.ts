import { matchPassword } from './../../validators/confirm-password.validator'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    resetPassword: FormGroup
    error: string
    token: string

    constructor(
        private authService: AuthService,
        private _snackbar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initForm()
        this.route.params.subscribe((params: Params) => {
            this.token = params['token']
        })
    }

    private initForm() {
        this.resetPassword = new FormGroup(
            {
                password: new FormControl('', [Validators.required]),
                passwordConfirm: new FormControl('', [Validators.required])
            },
            { validators: matchPassword }
        )
    }

    onSubmit() {
        const password = this.resetPassword.controls['password'].value
        const passwordConfirm =
            this.resetPassword.controls['passwordConfirm'].value
        if (this.resetPassword.valid && this.token) {
            this.authService
                .resetPassword(password, passwordConfirm, this.token)
                .subscribe({
                    next: (response: {
                        status: string
                        token: string
                        data: { user: any }
                    }) => {
                        console.log(response.data.user)
                        this._snackbar.open('Password reset', 'done', {
                            duration: 2000
                        })
                        this.router.navigate(['/auth/login'])
                    },
                    error: (error: HttpErrorResponse) => {
                        this.error = error.error.message
                    }
                })
        }
    }
}
