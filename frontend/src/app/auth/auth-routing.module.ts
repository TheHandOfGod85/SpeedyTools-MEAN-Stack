import { LoginComponent } from './components/login/login.component'
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './auth.component'
import { NgModule } from '@angular/core'
import { RegisterComponent } from './components/register/register.component'

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
