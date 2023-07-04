import { Equipment } from '../../models/equipment.model';
import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../services/equipments.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css'],
})
export class EquipmentDetailComponent implements OnInit {
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

  id: string;

  constructor(
    private equipmentService: EquipmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.equipmentService
      .get<{ status: string; data: { equipment: Equipment } }>(this.id)
      .subscribe((result) => {
        this.equipment = result.data.equipment;
      });
  }
}
