import { createAction, props } from '@ngrx/store';
import { Equipment } from '../../models/equipment.model';

export const loadEquipments = createAction('[Equipment] Load');

export const loadEquipmentsSuccess = createAction(
  '[Equipment] Load Success',
  props<{ equipments: Equipment[] }>()
);

export const loadEquipmentsFailure = createAction(
  '[Equipment] Load Fail',
  props<{ error: string }>()
);
