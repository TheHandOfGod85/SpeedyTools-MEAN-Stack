import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './components/login/login.component'
import { AuthComponent } from './auth.component'
import { AuthRoutingModule } from './auth-routing.module'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { SharedModule } from '../shared/shared.module'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [AuthComponent, LoginComponent],
    imports: [
        RouterModule,
        SharedModule,
        AuthRoutingModule,
        StoreModule.forFeature('auth', {}),
        EffectsModule.forFeature([])
    ]
})
export class AuthModule {}
