import { matchPassword } from './../../validators/confirm-password.validator'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup
    error: string

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.initForm()
    }

    private initForm() {
        this.registerForm = new FormGroup(
            {
                name: new FormControl('', [Validators.required]),
                email: new FormControl('', [
                    Validators.required,
                    Validators.email
                ]),
                password: new FormControl('', [
                    Validators.required,
                    Validators.minLength(8)
                ]),
                passwordConfirm: new FormControl('', [
                    Validators.required,
                    Validators.minLength(8)
                ])
            },
            { validators: matchPassword }
        )
    }

    onSubmit() {
        const name = this.registerForm.controls['name'].value
        const email = this.registerForm.controls['email'].value
        const password = this.registerForm.controls['password'].value
        const passwordConfirm =
            this.registerForm.controls['passwordConfirm'].value
        if (this.registerForm.valid) {
            this.authService
                .register(name, email, password, passwordConfirm)
                .subscribe({
                    next: () => this.router.navigateByUrl('/equipments'),
                    error: (error: HttpErrorResponse) => {
                        this.error = error.error.message
                        this.registerForm.reset()
                    }
                })
        }
    }
}
