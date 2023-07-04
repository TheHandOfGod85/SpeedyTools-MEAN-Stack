import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EquipmenState } from '../equipment.reducer';

const getEquipmentFeatureState =
  createFeatureSelector<EquipmenState>('equipments');

export const getEquipments = createSelector(
  getEquipmentFeatureState,
  (state) => state.equipments
);
