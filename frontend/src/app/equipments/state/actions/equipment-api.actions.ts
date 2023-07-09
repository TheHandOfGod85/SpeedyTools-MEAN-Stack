import { createAction, props } from '@ngrx/store';
import { Equipment } from '../../models/equipment.model';

export const loadEquipmentsSuccess = createAction(
  '[Equipment API] Load Success',
  props<{ equipments: Equipment[] }>()
);

export const loadEquipmentsFailure = createAction(
  '[Equipment API] Load Fail',
  props<{ error: string }>()
);

export const updateEquipmentSuccess = createAction(
  '[Equipment API] Update Equipment Success',
  props<{ equipment: Equipment; }>()
);
export const updateEquipmentFailure = createAction(
  '[Equipment API] Update Equipment Failure',
  props<{ error: string }>()
);

export const deleteEquipmentSuccess = createAction(
  '[Equipment API] Delete Equipment Success',
  props<{ id: string }>()
);
export const deleteEquipmentFailure = createAction(
  '[Equipment API] Delete Equipment Failure',
  props<{ error: string }>()
);
export const createEquipmentSuccess = createAction(
  '[Equipment API] Create Equipment Success',
  props<{ equipment: Equipment }>()
);
export const createEquipmentFailure = createAction(
  '[Equipment API] Create Equipment Failure',
  props<{ error: string }>()
);
