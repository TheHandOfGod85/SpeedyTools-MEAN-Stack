import { Component } from '@angular/core'
import { Equipment } from '../../models/equipment.model'
import { DialogService } from 'src/app/shared/services/dialog.service'
import { Store } from '@ngrx/store'
import {
    getEquipments,
    getEquipmentsCount,
    getIsLoading,
    State
} from '../../state'
import { Observable } from 'rxjs'
import { EquipmentPageActions } from '../../state/actions'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'app-equipments-list',
    templateUrl: './equipments-list.component.html',
    styleUrls: ['./equipments-list.component.css']
})
export class EquipmentsListComponent {
    isLoading$: Observable<boolean>
    equipments$: Observable<Equipment[]>
    count$: Observable<number>
    searchTerm: string = ''
    page = 0
    pageSize = 5

    constructor(
        private dialogService: DialogService,
        private store: Store<State>
    ) {}

    ngOnInit(): void {
        this.store.dispatch(
            EquipmentPageActions.loadEquipments({
                page: this.page + 1,
                limit: this.pageSize,
                name: null
            })
        )
        this.equipments$ = this.store.select(getEquipments)
        this.isLoading$ = this.store.select(getIsLoading)
        this.count$ = this.store.select(getEquipmentsCount)
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

    handlePageChange(pageEvent: PageEvent): void {
        this.page = pageEvent.pageIndex
        this.pageSize = pageEvent.pageSize
        this.store.dispatch(
            EquipmentPageActions.loadEquipments({
                page: this.page + 1,
                limit: this.pageSize,
                name: null
            })
        )
    }

    onSearchChange(name: HTMLInputElement): void {
        this.page = 0
        if (name.value !== '') {
            this.store.dispatch(
                EquipmentPageActions.loadEquipments({
                    page: null,
                    limit: null,
                    name: name.value
                })
            )
        }
    }
    onReset(): void {
        this.store.dispatch(
            EquipmentPageActions.loadEquipments({
                page: this.page + 1,
                limit: this.pageSize,
                name: null
            })
        )
    }
}
