import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentService } from '../../services/equipments.service';
import * as EquipmentActions from './../actions/load-equipments.action';
import { map, mergeMap } from 'rxjs';
import { Equipment } from '../../models/equipment.model';

@Injectable()
export class EquipmentEffects {
  constructor(
    private actions$: Actions,
    private equipmentService: EquipmentService
  ) {}

  loadEquipments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EquipmentActions.loadEquipments),
      mergeMap(() =>
        this.equipmentService
          .getAll<{ status: string; data: { equipments: Equipment[] } }>()
          .pipe(
            map((result) =>
              EquipmentActions.loadEquipmentsSuccess({
                equipments: result.data.equipments,
              })
            )
          )
      )
    );
  });
}
