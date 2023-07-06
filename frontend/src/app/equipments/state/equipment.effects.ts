import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentService } from '../services/equipments.service';
import { concatMap, map, mergeMap, tap } from 'rxjs';
import { EquipmentApiActions, EquipmentPageActions } from './actions';

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
        this.equipmentService.getAll().pipe(
          map((result) =>
            EquipmentApiActions.loadEquipmentsSuccess({
              equipments: result.data.equipments,
            })
          )
        )
      )
    );
  });

  updateEquipment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EquipmentPageActions.updateEquipment),
      concatMap((action) =>
        this.equipmentService.update(action.id, action.equipment).pipe(
          map((result) =>
            EquipmentApiActions.updateEquipmentSuccess({
              equipment: result.data.equipment,
            })
          )
        )
      )
    );
  });
  deleteEquipment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EquipmentPageActions.deleteEquipment),
      mergeMap((action) => {
        return this.equipmentService
          .delete(action.id)
          .pipe(
            map(() =>
              EquipmentApiActions.deleteEquipmentSuccess({ id: action.id })
            )
          );
      })
    );
  });
  createEquipment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EquipmentPageActions.craeteEquipment),
      concatMap((action) => {
        return this.equipmentService.create(action.equipment).pipe(
          map((result) =>
            EquipmentApiActions.createEquipmentSuccess({
              equipment: result.data.equipment,
            })
          )
        );
      })
    );
  });
}
