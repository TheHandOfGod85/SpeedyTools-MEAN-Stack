import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsComponent } from './equipments.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';
import { EquipmentsListComponent } from './equipments-list/equipments-list.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentsComponent,
    children: [
      { path: '', component: EquipmentsListComponent },
      { path: 'add', component: AddEquipmentComponent },
      { path: ':id', component: EquipmentDetailComponent },
      { path: ':id/edit', component: AddEquipmentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentRoutingModule {}
