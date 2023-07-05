import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Equipment } from '../../models/equipment.model';
import { EquipmentService } from '../../services/equipments.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Store } from '@ngrx/store';
import { getEquipments, State } from '../../state';
import { Observable } from 'rxjs';
import { EquipmentPageActions } from '../../state/actions';

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
    this.store.dispatch(EquipmentPageActions.loadEquipments());
    this.equipments$ = this.store.select(getEquipments);
  }
}
