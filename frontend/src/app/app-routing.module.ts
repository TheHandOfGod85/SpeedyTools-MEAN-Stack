import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './core/components/home/home.component'
import { NotFoundComponent } from './core/components/not-found/not-found.component'

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'equipments',
        loadChildren: () =>
            import('./equipments/equipments.module').then(
                (m) => m.EquipmentsModule
            )
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule)
    },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
