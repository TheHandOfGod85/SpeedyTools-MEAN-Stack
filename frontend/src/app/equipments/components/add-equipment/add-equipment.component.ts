import { Equipment } from '../../models/equipment.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { State, getIsLoading } from '../../state';
import { EquipmentPageActions } from '../../state/actions';
import { Observable, tap } from 'rxjs';
import { getCurrentEquipment } from '../../state';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css'],
})
export class AddEquipmentComponent implements OnInit, OnDestroy {
  addEquipmentForm: FormGroup;
  equipment$: Observable<Equipment | null>;
  isLoading$: Observable<boolean>;
  title: string = '';
  equipmentId: string;

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private store: Store<State>
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(
      EquipmentPageActions.setCurrentEquipmentId({ id: null })
    );
  }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      this.equipmentId = params['id'];
      if (this.equipmentId) {
        this.store.dispatch(
          EquipmentPageActions.setCurrentEquipmentId({ id: this.equipmentId })
        );
        this.equipment$ = this.store
          .select(getCurrentEquipment)
          .pipe(
            tap((currentEquipment) => this.displayEquipment(currentEquipment))
          );
      }
    });
    this.equipment$ = this.store
      .select(getCurrentEquipment)
      .pipe(tap((currentEquipment) => this.displayEquipment(currentEquipment)));
    this.isLoading$ = this.store.select(getIsLoading);
  }

  private initForm() {
    this.addEquipmentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      quantity: new FormControl(0),
      serialNumber: new FormControl('', Validators.required),
      manufacturer: new FormControl('', Validators.required),
      installationDate: new FormControl(''),
      powerRequirement: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
    });
  }

  private displayEquipment(equipment: Equipment | null): void {
    this.addEquipmentForm.reset();

    if (equipment) {
      // Reset the form back to pristine
      // Display the appropriate page title
      if (equipment._id === undefined) {
        this.title = 'Add Equipment';
      } else {
        this.title = `Edit Equipment: ${equipment.name}`;
      }

      // Update the data on the form
      this.addEquipmentForm.patchValue({
        name: equipment.name,
        description: equipment.description,
        quantity: equipment.quantity,
        serialNumber: equipment.serialNumber,
        manufacturer: equipment.manufacturer,
        installationDate: equipment.installationDate,
        powerRequirement: equipment.powerRequirement,
        location: equipment.location,
      });
    }
  }

  saveEquipment(id: string) {
    if (this.addEquipmentForm.valid) {
      if (this.equipmentId) {
        this.store.dispatch(
          EquipmentPageActions.updateEquipment({
            id,
            equipment: this.addEquipmentForm.value,
          })
        );
        this._snackBar.open('Updated!', 'Close', { duration: 1000 });
      } else {
        const equipment = this.addEquipmentForm.value;
        this.store.dispatch(
          EquipmentPageActions.craeteEquipment({
            equipment,
          })
        );
        this._snackBar.open('Created!', 'Close', { duration: 1000 });
      }
    }
  }
}
