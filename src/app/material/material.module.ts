import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { 
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatSelectModule,
  MatTableModule,
  MatExpansionModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatSelectModule,
  MatTableModule,
  MatExpansionModule
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    material
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    material
  ]
})
export class MaterialModule { }
