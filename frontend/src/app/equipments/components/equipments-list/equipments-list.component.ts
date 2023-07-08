import { Component } from '@angular/core'
import { Equipment } from '../../models/equipment.model'
import { DialogService } from 'src/app/shared/services/dialog.service'
import { Store } from '@ngrx/store'
import { getEquipments, getIsLoading, State } from '../../state'
import { Observable } from 'rxjs'
import { EquipmentPageActions } from '../../state/actions'

@Component({
    selector: 'app-equipments-list',
    templateUrl: './equipments-list.component.html',
    styleUrls: ['./equipments-list.component.css']
})
export class EquipmentsListComponent {
    isLoading$: Observable<boolean>
    equipments$: Observable<Equipment[]>

    constructor(
        private dialogService: DialogService,
        private store: Store<State>
    ) {}

    ngOnInit(): void {
        this.store.dispatch(EquipmentPageActions.loadEquipments())
        this.equipments$ = this.store.select(getEquipments)
        this.isLoading$ = this.store.select(getIsLoading)
    }

    onDeleteEquipment(id: string): void {
        this.dialogService
            .confirmDialog({
                title: 'DELETE EQUIPMENT',
                message: 'Are you sure you want to delete?',
                confirmText: 'No',
                cancelText: 'Yes'
            })
            .subscribe((confirm) => {
                if (confirm) {
                    this.store.dispatch(
                        EquipmentPageActions.deleteEquipment({ id })
                    )
                }
            })
    }
}
