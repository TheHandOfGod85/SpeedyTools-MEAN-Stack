import { equipmentReducer } from './state/equipment.reducer';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EquipmentsComponent } from './equipments.component';
import { EquipmentDetailComponent } from './components/equipment-detail/equipment-detail.component';
import { EquipmentRoutingModule } from './equipments-routing.module';
import { EquipmentsListComponent } from './components/equipments-list/equipments-list.component';
import { SharedModule } from '../shared/shared.module';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EquipmentEffects } from './state/equipment.effects';

@NgModule({
  declarations: [
    EquipmentsComponent,
    EquipmentDetailComponent,
    EquipmentsListComponent,
    AddEquipmentComponent,
  ],
  imports: [
    RouterModule,
    EquipmentRoutingModule,
    SharedModule,
    StoreModule.forFeature('equipments', equipmentReducer),
    EffectsModule.forFeature([EquipmentEffects]),
  ],
})
export class EquipmentsModule {}
