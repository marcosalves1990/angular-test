import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../pages/crud-list/confirmation-dialog.component'; 

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [ConfirmationDialogComponent] // Exporte-o para uso em outros módulos
})
export class SharedModule { }
