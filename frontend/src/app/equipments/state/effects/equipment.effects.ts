import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentService } from '../../services/equipments.service';
import { map, mergeMap } from 'rxjs';
import { Equipment } from '../../models/equipment.model';
import { EquipmentApiActions, EquipmentPageActions } from '../actions';

@Injectable()
export class EquipmentEffects {
  constructor(
    private actions$: Actions,
    private equipmentService: EquipmentService
  ) {}

  loadEquipments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EquipmentPageActions.loadEquipments),
      mergeMap(() =>
        this.equipmentService
          .getAll<{ status: string; data: { equipments: Equipment[] } }>()
          .pipe(
            map((result) =>
              EquipmentApiActions.loadEquipmentsSuccess({
                equipments: result.data.equipments,
              })
            )
          )
      )
    );
  });
}
