import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  equipments: any[];

  constructor(private equipmentService: TestService) {}

  ngOnInit(): void {
    this.equipmentService
      .getAll<{ status: string; result: number; data: { equipments: any[] } }>()
      .subscribe((result) => {
        console.log(result);
        this.equipments = result.data.equipments;
      });
  }
}
