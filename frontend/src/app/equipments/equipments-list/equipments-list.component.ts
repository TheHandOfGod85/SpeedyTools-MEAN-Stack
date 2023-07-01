import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Equipment } from '../equipment.model';
import { EquipmentService } from '../equipments.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-equipments-list',
  templateUrl: './equipments-list.component.html',
  styleUrls: ['./equipments-list.component.css'],
})
export class EquipmentsListComponent {
  equipments: Equipment[];
  isFetching: boolean = false;

  constructor(
    private equipmentService: EquipmentService,
    private _snackBar: MatSnackBar,
    private dialogService: DialogService
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
    this.isFetching = false;
    this.equipmentService
      .getAll<{
        status: string;
        result: number;
        data: { equipments: Equipment[] };
      }>()
      .subscribe((result) => {
        this.isFetching = true;
        this.equipments = result.data.equipments;
      });
  }
}
