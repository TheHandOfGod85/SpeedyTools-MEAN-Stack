import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EquipmentsComponent } from './equipments.component'
import { EquipmentDetailComponent } from './components/equipment-detail/equipment-detail.component'
import { EquipmentsListComponent } from './components/equipments-list/equipments-list.component'
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component'
import { AuthGuard } from '../auth/guards/auth.guard'

const routes: Routes = [
    {
        path: '',
        component: EquipmentsComponent,
        children: [
            {
                path: '',
                component: EquipmentsListComponent,
                canActivate: [AuthGuard]
            },
            { path: 'add', component: AddEquipmentComponent },
            { path: ':id', component: EquipmentDetailComponent },
            { path: ':id/edit', component: AddEquipmentComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EquipmentRoutingModule {}
