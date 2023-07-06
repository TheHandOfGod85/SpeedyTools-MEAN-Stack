import { createAction, props } from '@ngrx/store';
import { Equipment } from '../../models/equipment.model';

export const loadEquipments = createAction('[Equipment Page] Load');

export const updateEquipment = createAction(
  '[Equipment Page] Update equipment',
  props<{ id: string; equipment: Equipment }>()
);

export const setCurrentEquipmentId = createAction(
  '[Equipment Page] Set Equipment ID',
  props<{ id: string }>()
);

export const deleteEquipment = createAction(
  '[Equipment API] Delete Equipment',
  props<{ id: string }>()
);
export const craeteEquipment = createAction(
  '[Equipment Page] Create Equipment',
  props<{ equipment: Equipment }>()
);
