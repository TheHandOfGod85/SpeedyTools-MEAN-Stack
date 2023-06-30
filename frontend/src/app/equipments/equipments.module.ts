import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentsComponent } from './equipments.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';
import { EquipmentRoutingModule } from './equipments-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EquipmentsListComponent } from './equipments-list/equipments-list.component';

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
  ],
})
export class EquipmentsModule {}
