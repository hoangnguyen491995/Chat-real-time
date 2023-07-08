import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManageUserComponent } from './adminManageUser.component';
import { AdminManageUser } from './adminManageUser-routing.module';
import { AboutRoutingModule } from '../about/about-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule , AdminManageUser , AboutRoutingModule , FormsModule , ReactiveFormsModule
  ],
  declarations: [AdminManageUserComponent]
})
export class AdminManageUserModule { }
