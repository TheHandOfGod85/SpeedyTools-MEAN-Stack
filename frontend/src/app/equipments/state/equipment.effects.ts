import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EquipmentService } from '../services/equipments.service'
import { catchError, concatMap, map, mergeMap, of, tap } from 'rxjs'
import { EquipmentApiActions, EquipmentPageActions } from './actions'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class EquipmentEffects {
    constructor(
        private actions$: Actions,
        private equipmentService: EquipmentService,
        private router: Router,
        private _snackbar: MatSnackBar
    ) {}

    loadEquipments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(EquipmentPageActions.loadEquipments),
            mergeMap((action) =>
                this.equipmentService.getAll(action.page, action.limit).pipe(
                    map((result) => {
                        return EquipmentApiActions.loadEquipmentsSuccess({
                            equipments: result.data.equipments,
                            count: result.results
                        })
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            EquipmentApiActions.loadEquipmentsFailure({
                                error: error.error.message
                            })
                        )
                    )
                )
            )
        )
    })

    updateEquipment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(EquipmentPageActions.updateEquipment),
            concatMap((action) =>
                this.equipmentService.update(action.id, action.equipment).pipe(
                    map((result) =>
                        EquipmentApiActions.updateEquipmentSuccess({
                            equipment: result.data.equipment
                        })
                    ),
                    tap((success) => {
                        if (
                            success.type ===
                            EquipmentApiActions.updateEquipmentSuccess.type
                        ) {
                            this.router.navigateByUrl(action.redirect)
                            this._snackbar.open(action.message, 'X', {
                                duration: 1000
                            })
                        }
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            EquipmentApiActions.updateEquipmentFailure({
                                error: error.error.message
                            })
                        )
                    )
                )
            )
        )
    })
    deleteEquipment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(EquipmentPageActions.deleteEquipment),
            mergeMap((action) => {
                return this.equipmentService.delete(action.id).pipe(
                    map(() =>
                        EquipmentApiActions.deleteEquipmentSuccess({
                            id: action.id
                        })
                    ),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            EquipmentApiActions.deleteEquipmentFailure({
                                error: error.error.message
                            })
                        )
                    )
                )
            })
        )
    })
    createEquipment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(EquipmentPageActions.craeteEquipment),
            concatMap((action) => {
                return this.equipmentService.create(action.equipment).pipe(
                    map((result) =>
                        EquipmentApiActions.createEquipmentSuccess({
                            equipment: result.data.equipment
                        })
                    ),
                    tap((success) => {
                        if (
                            success.type ===
                            EquipmentApiActions.createEquipmentSuccess.type
                        ) {
                            this.router.navigateByUrl(action.redirect)
                            this._snackbar.open(action.message, 'X', {
                                duration: 1000
                            })
                        }
                    }),
                    catchError((error: HttpErrorResponse) => {
                        return of(
                            EquipmentApiActions.createEquipmentFailure({
                                error: error.error.message
                            })
                        )
                    })
                )
            })
        )
    })
}
