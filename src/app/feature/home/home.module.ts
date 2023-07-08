import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { PopoverModule } from 'ngx-bootstrap/popover';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';


import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule , HomeRoutingModule,  MatButtonModule, MatMenuModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, HomeRoutingModule, PopoverModule.forRoot(), MatBadgeModule, MatDatepickerModule,
    FormsModule , MatTabsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
