import { Equipment } from '../models/equipment.model';
import { createReducer, on } from '@ngrx/store';
import { EquipmentApiActions } from './actions';

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
  on(
    EquipmentApiActions.loadEquipmentsSuccess,
    (state, action): EquipmenState => {
      return {
        ...state,
        equipments: action.equipments,
        error: '',
      };
    }
  ),
  on(
    EquipmentApiActions.loadEquipmentsFailure,
    (state, action): EquipmenState => {
      return {
        ...state,
        equipments: [],
        error: action.error,
      };
    }
  )
);
