import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentsComponent } from './equipments.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';
import { EquipmentRoutingModule } from './equipments-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EquipmentsListComponent } from './equipments-list/equipments-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EquipmentsComponent,
    EquipmentDetailComponent,
    EquipmentsListComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    EquipmentRoutingModule,
    MatSnackBarModule,
    SharedModule
  ],
})
export class EquipmentsModule {}
