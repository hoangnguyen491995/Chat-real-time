import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatTabsModule} from '@angular/material/tabs';
import { PostsComponent } from './Posts/Posts.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule , HomeRoutingModule,  MatButtonModule, MatMenuModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, HomeRoutingModule, PopoverModule.forRoot(), MatBadgeModule, MatDatepickerModule,
    FormsModule , MatTabsModule,MatSelectModule, ReactiveFormsModule, MatTableModule
  ],
  declarations: [HomeComponent , PostsComponent]
})
export class HomeModule { }
