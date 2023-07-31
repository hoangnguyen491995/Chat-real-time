import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRouterModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  imports: [
    CommonModule , LoginRouterModule ,  FormsModule , ReactiveFormsModule, ShareModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
