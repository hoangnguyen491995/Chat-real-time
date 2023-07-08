import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRouterModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,  RegisterRouterModule,  FormsModule , ReactiveFormsModule , MatDatepickerModule, MatNativeDateModule, MatDividerModule, MatInputModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }





