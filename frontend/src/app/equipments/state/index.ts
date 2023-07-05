import * as AppState from './../../state/app.state';
import { EquipmenState } from './equipment.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends AppState.State {
  equipments: EquipmenState;
}

const getEquipmentFeatureState =
  createFeatureSelector<EquipmenState>('equipments');

export const getEquipments = createSelector(
  getEquipmentFeatureState,
  (state) => state.equipments
);
