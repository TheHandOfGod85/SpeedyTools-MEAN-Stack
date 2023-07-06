import { Equipment } from '../models/equipment.model';
import * as AppState from './../../state/app.state';
import { EquipmentState } from './equipment.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends AppState.State {
  equipments: EquipmentState;
}

const getEquipmentFeatureState =
  createFeatureSelector<EquipmentState>('equipments');

export const getEquipments = createSelector(
  getEquipmentFeatureState,
  (state) => state.equipments
);

export const getCurrentEquipmentId = createSelector(
  getEquipmentFeatureState,
  (state) => state.currentEquipmentId
);

export const getIsLoading = createSelector(
  getEquipmentFeatureState,
  (state) => state.isLoading
);

export const getCurrentEquipment = createSelector(
  getEquipmentFeatureState,
  getCurrentEquipmentId,
  (state, currentEquipmentId) => {
    if (currentEquipmentId === null) {
      const equipment: Equipment = {
        name: '',
        description: '',
        quantity: 0,
        serialNumber: '',
        manufacturer: '',
        installationDate: null,
        powerRequirement: null,
        location: '',
      };
      return equipment;
    } else {
      const foundEquipment = state.equipments.find(
        (equip) => equip._id === currentEquipmentId
      );
      return foundEquipment;
    }
  }
);
