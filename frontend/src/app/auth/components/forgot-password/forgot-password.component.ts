import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    forgotPassword: FormGroup
    error: string

    constructor(
        private authService: AuthService,
        private _snackbar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initForm()
    }
    private initForm() {
        this.forgotPassword = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email])
        })
    }

    onSubmit() {
        const email: string = this.forgotPassword.controls['email'].value
        this.authService.forgotPassword(email).subscribe({
            next: (response: { status: string; message: string }) => {
                this._snackbar.open(response.message, 'done', {
                    duration: 2000
                })
                this.router.navigateByUrl('/')
            },
            error: (error: HttpErrorResponse) => {
                console.log(error)
                this.error = error.error.message
            }
        })
    }
}
