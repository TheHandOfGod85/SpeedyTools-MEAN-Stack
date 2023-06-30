import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentsComponent } from './equipments.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';
import { EquipmentRoutingModule } from './equipments-routing.module';

@NgModule({
  declarations: [EquipmentsComponent, EquipmentDetailComponent],
  imports: [CommonModule, EquipmentRoutingModule],
})
export class EquipmentsModule {}
