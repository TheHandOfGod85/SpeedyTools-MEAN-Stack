import { NgModule } from '@angular/core'
import { LoginComponent } from './components/login/login.component'
import { AuthComponent } from './auth.component'
import { AuthRoutingModule } from './auth-routing.module'
import { SharedModule } from '../shared/shared.module'
import { RouterModule } from '@angular/router'
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component'

@NgModule({
    declarations: [AuthComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent],
    imports: [RouterModule, SharedModule, AuthRoutingModule]
})
export class AuthModule {}
