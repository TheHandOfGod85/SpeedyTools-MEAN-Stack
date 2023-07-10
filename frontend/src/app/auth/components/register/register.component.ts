import { matchPassword } from './../../validators/confirm-password.validator'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.initForm()
    }

    private initForm() {
        this.registerForm = new FormGroup(
            {
                email: new FormControl('', [
                    Validators.required,
                    Validators.email
                ]),
                password: new FormControl('', [
                    Validators.required,
                    Validators.minLength(8)
                ]),
                confirmPassword: new FormControl('', [
                    Validators.required,
                    Validators.minLength(8)
                ])
            },
            { validators: matchPassword }
        )
    }

    onSubmit() {
        const email = this.registerForm.controls['email'].value
        const password = this.registerForm.controls['password'].value
        if (this.registerForm.valid) {
            this.authService
                .login(email, password)
                .subscribe(() => this.router.navigateByUrl('/equipments'))
        }
    }
}
