import { Equipment } from './../equipment.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EquipmentService } from '../equipments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css'],
})
export class AddEquipmentComponent implements OnInit {
  addEquipmentForm: FormGroup;
  id: string;
  equipment: Equipment = {
    name: '',
    description: '',
    installationDate: null,
    location: '',
    manufacturer: '',
    powerRequirement: null,
    quantity: 0,
    serialNumber: '',
  };

  constructor(
    private route: ActivatedRoute,
    private equipmentService: EquipmentService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    if (this.id) {
      this.equipmentService
        .get<{ status: string; data: { equipment: Equipment } }>(this.id)
        .subscribe((result) => {
          this.equipment = result.data.equipment;
          this.initForm();
        });
    }
    this.initForm();
  }

  private initForm() {
    this.addEquipmentForm = new FormGroup({
      name: new FormControl(this.equipment.name, Validators.required),
      description: new FormControl(this.equipment.description),
      quantity: new FormControl(this.equipment.quantity),
      serialNumber: new FormControl(
        this.equipment.serialNumber,
        Validators.required
      ),
      manufacturer: new FormControl(
        this.equipment.manufacturer,
        Validators.required
      ),
      installationDate: new FormControl(this.equipment.installationDate),
      powerRequirement: new FormControl(
        this.equipment.powerRequirement,
        Validators.required
      ),
      location: new FormControl(this.equipment.location, Validators.required),
    });
  }

  onSubmit() {
    if (this.id && this.addEquipmentForm.valid) {
      this.equipmentService
        .update<{ status: string }>(this.id, this.addEquipmentForm.value)
        .subscribe((result) => {
          if (result.status === 'success') {
            this._snackBar.open('Updated', 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        });
    } else {
      if (this.addEquipmentForm.valid) {
        this.equipmentService
          .create<{ status: string }>(this.addEquipmentForm.value)
          .subscribe((result) => {
            if (result.status === 'success') {
              this._snackBar.open('Created', 'Close', {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
              this.router.navigate(['equipments']);
            }
          });
      }
    }
  }
}
