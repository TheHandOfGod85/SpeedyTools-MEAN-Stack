import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
    forgotPassword: FormGroup
}
