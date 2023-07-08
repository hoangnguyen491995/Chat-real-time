import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRouterModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule , LoginRouterModule ,  FormsModule , ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
