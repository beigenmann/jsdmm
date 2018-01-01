import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatMenuModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatFormFieldModule],
  exports: [MatButtonModule, MatToolbarModule, MatMenuModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatFormFieldModule]
})
export class MaterialModule { }