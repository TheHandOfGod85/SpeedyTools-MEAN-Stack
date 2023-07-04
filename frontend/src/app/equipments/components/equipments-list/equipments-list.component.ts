import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Equipment } from '../../models/equipment.model';
import { EquipmentService } from '../../services/equipments.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Store } from '@ngrx/store';
import { State } from '../../state/equipment.reducer';
import * as EquipmentActions from './../../state/actions/load-equipments.action';
import { getEquipments } from '../../state/selectors/equipment.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-equipments-list',
  templateUrl: './equipments-list.component.html',
  styleUrls: ['./equipments-list.component.css'],
})
export class EquipmentsListComponent {
  equipments$: Observable<Equipment[]>;
  isFetching: boolean = false;

  constructor(
    private equipmentService: EquipmentService,
    private _snackBar: MatSnackBar,
    private dialogService: DialogService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.onLoadingEquipments();
  }

  onDeleteEquipment(id: string): void {
    this.dialogService
      .confirmDialog({
        title: 'DELETE EQUIPMENT',
        message: 'Are you sure you want to delete?',
        confirmText: 'No',
        cancelText: 'Yes',
      })
      .subscribe((confirm) => {
        if (confirm) {
          this.equipmentService.delete(id).subscribe(() => {
            this.onLoadingEquipments();
            this._snackBar.open('Deleted', 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          });
        }
      });
  }

  onLoadingEquipments() {
    this.store.dispatch(EquipmentActions.loadEquipments());
    this.equipments$ = this.store.select(getEquipments);
  }
}
