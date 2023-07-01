import { Equipment } from './../equipment.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EquipmentService } from '../equipments.service';

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
    private equipmentService: EquipmentService
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
    } else {
      this.initForm();
    }
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
    console.log(this.addEquipmentForm);
  }
}
