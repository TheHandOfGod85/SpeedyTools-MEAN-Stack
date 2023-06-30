import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Injectable({ providedIn: 'root' })
export class EquipmentService extends DataService {
  protected override url: string = 'http://localhost:3000/api/equipments/';
  constructor(http: HttpClient) {
    super(http);
  }
}
