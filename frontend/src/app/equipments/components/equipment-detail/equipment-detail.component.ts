import { Observable, tap } from 'rxjs';
import { Equipment } from '../../models/equipment.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EquipmentService } from '../../services/equipments.service';
import { ActivatedRoute, Params } from '@angular/router';
import { State, getCurrentEquipment, getIsLoading } from '../../state';
import { Store } from '@ngrx/store';
import { EquipmentPageActions } from '../../state/actions';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css'],
})
export class EquipmentDetailComponent implements OnInit, OnDestroy {
  equipment$: Observable<Equipment | null>;

  constructor(private route: ActivatedRoute, private store: Store<State>) {}

  ngOnDestroy(): void {
    this.store.dispatch(
      EquipmentPageActions.setCurrentEquipmentId({ id: null })
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        this.store.dispatch(EquipmentPageActions.setCurrentEquipmentId({ id }));
        this.equipment$ = this.store.select(getCurrentEquipment);
      }
    });
  }
}
