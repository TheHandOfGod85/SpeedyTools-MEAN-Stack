import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Equipment } from '../equipment.model';
import { EquipmentService } from '../equipments.service';

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
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.onLoadingEquipments();
  }

  onDeleteEquipment(id: string) {
    this.equipmentService.delete(id).subscribe(() => {
      this.onLoadingEquipments();
      this._snackBar.open('Deleted', 'Close', {
        horizontalPosition: 'center',
      });
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
