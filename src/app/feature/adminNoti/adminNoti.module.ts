import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNotiComponent } from './adminNoti.component';
import { AdminManageUser } from './adminNoti-routing.module';

@NgModule({
  imports: [
    CommonModule, AdminManageUser
  ],
  declarations: [AdminNotiComponent]
})
export class AdminNotiModule { }
