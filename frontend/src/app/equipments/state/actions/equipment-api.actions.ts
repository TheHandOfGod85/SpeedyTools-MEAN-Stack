import { createAction, props } from "@ngrx/store";
import { Equipment } from "../../models/equipment.model";

export const loadEquipmentsSuccess = createAction(
    '[Equipment API] Load Success',
    props<{ equipments: Equipment[] }>()
  );
  
  export const loadEquipmentsFailure = createAction(
    '[Equipment API] Load Fail',
    props<{ error: string }>()
  );