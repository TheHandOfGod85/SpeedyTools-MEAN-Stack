import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup
    error: string

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
            this.authService.login(email, password).subscribe({
                next: () => this.router.navigateByUrl('/equipments'),
                error: (error: HttpErrorResponse) => {
                    this.error = error.error.message
                    this.loginForm.reset()
                }
            })
        }
    }
}
