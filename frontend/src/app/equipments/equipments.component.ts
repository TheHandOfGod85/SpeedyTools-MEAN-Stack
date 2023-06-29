import { Component } from '@angular/core';
import { TestService } from './equipments.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css'],
})
export class EquipmentsComponent {
  equipments: any[];
  isFetching: boolean = false;

  constructor(private equipmentService: TestService) {}

  ngOnInit(): void {
    this.isFetching = false;
    this.equipmentService
      .getAll<{ status: string; result: number; data: { equipments: any[] } }>()
      .subscribe((result) => {
        console.log(result);
        this.isFetching = true;
        this.equipments = result.data.equipments;
      });
  }
}
