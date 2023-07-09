import { NgModule } from '@angular/core'
import { LoginComponent } from './components/login/login.component'
import { AuthComponent } from './auth.component'
import { AuthRoutingModule } from './auth-routing.module'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { SharedModule } from '../shared/shared.module'
import { RouterModule } from '@angular/router'
import { authReducer } from './state/auth.reducer'
import { AuthEffects } from './state/auth.effects'

@NgModule({
    declarations: [AuthComponent, LoginComponent],
    imports: [
        RouterModule,
        SharedModule,
        AuthRoutingModule,
        StoreModule.forFeature('auth', authReducer),
        EffectsModule.forFeature([AuthEffects])
    ]
})
export class AuthModule {}
