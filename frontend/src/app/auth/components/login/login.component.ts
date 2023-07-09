import { Router } from '@angular/router'
import { matchPassword } from './../../validators/confirm-password.validator'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.initForm()
    }
    private initForm() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ])
        })
    }

    onSubmit() {
        const email = this.loginForm.controls['email'].value
        const password = this.loginForm.controls['password'].value
        if (this.loginForm.valid) {
            this.authService
                .login(email, password)
                .subscribe(() => this.router.navigateByUrl('/equipments'))
        }
    }
}
