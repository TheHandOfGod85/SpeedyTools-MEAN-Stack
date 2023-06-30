import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsComponent } from './equipments.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentsComponent,
    children: [{ path: ':id', component: EquipmentDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentRoutingModule {}
