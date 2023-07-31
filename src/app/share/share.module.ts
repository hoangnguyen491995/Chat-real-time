import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareComponent } from './share.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadImagesComponent } from './upload-images/upload-images.component';


@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule 
  ],
  declarations: [ShareComponent, InputComponent, UploadImagesComponent],
  exports: [MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule, 
    InputComponent, 
    UploadImagesComponent
    
  ]
})
export class ShareModule { }
