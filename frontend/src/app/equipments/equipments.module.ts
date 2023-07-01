import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EquipmentsComponent } from './equipments.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';
import { EquipmentRoutingModule } from './equipments-routing.module';
import { EquipmentsListComponent } from './equipments-list/equipments-list.component';
import { SharedModule } from '../shared/shared.module';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';

@NgModule({
  declarations: [
    EquipmentsComponent,
    EquipmentDetailComponent,
    EquipmentsListComponent,
    AddEquipmentComponent,
  ],
  imports: [RouterModule, EquipmentRoutingModule, SharedModule],
})
export class EquipmentsModule {}
