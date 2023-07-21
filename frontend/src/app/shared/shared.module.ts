import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConfirmationComponent } from './components/confirmation/confirmation.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatNativeDateModule } from '@angular/material/core'
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { sharedReducer } from './state/shared.reducer'
import { MatPaginatorModule } from '@angular/material/paginator'
import { FormsModule } from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination'
import { LoadingComponent } from './components/loading/loading.component'
@NgModule({
    declarations: [ConfirmationComponent, LoadingComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        StoreModule.forFeature('shared', sharedReducer),
        MatPaginatorModule,
        FormsModule,
        NgxPaginationModule
    ],
    exports: [
        ConfirmationComponent,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        FormsModule,
        NgxPaginationModule,
        LoadingComponent
    ]
})
export class SharedModule {}
