import { Equipment } from '../models/equipment.model';
import * as AppState from './../../state/app.state';
import * as EquipmentActions from './actions/load-equipments.action';
import { createReducer, on } from '@ngrx/store';

export interface State extends AppState.State {
  equipments: EquipmenState;
}

export interface EquipmenState {
  equipments: Equipment[];
  error: string;
}

const initialState: EquipmenState = {
  equipments: [],
  error: '',
};

export const equipmentReducer = createReducer<EquipmenState>(
  initialState,
  on(EquipmentActions.loadEquipmentsSuccess, (state, action): EquipmenState => {
    return {
      ...state,
      equipments: action.equipments,
      error: '',
    };
  }),
  on(EquipmentActions.loadEquipmentsFailure, (state, action): EquipmenState => {
    return {
      ...state,
      equipments: [],
      error: action.error,
    };
  })
);
