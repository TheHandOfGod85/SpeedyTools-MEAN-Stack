import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Equipment } from '../models/equipment.model';

@Injectable({ providedIn: 'root' })
export class EquipmentService extends DataService<Result, Equipment> {
  protected override url: string = 'http://localhost:3000/api/equipments/';
  constructor(http: HttpClient) {
    super(http);
  }
}

interface Result {
  status: string;
  data: {
    equipments: Equipment[];
    equipment: Equipment;
  };
}
