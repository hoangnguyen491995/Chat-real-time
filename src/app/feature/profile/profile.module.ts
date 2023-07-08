import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { LoginRouterModule } from './profile-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { ListUserComponent } from './listUser/listUser.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule, LoginRouterModule, MatTabsModule, MatIconModule, MatMenuModule
  ],
  declarations: [ProfileComponent , ListUserComponent]
})
export class ProfileModule { }
