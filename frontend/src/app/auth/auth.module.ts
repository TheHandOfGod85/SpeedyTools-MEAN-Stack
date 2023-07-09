import { NgModule } from '@angular/core'
import { LoginComponent } from './components/login/login.component'
import { AuthComponent } from './auth.component'
import { AuthRoutingModule } from './auth-routing.module'
import { SharedModule } from '../shared/shared.module'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [AuthComponent, LoginComponent],
    imports: [
        RouterModule,
        SharedModule,
        AuthRoutingModule,
    ]
})
export class AuthModule {}
