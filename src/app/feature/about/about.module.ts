import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';

import { AboutRoutingModule } from './about-routing.module';
import { ButtonComponent } from 'src/app/share/button/button.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  imports: [
    FormsModule,
    CommonModule, AboutRoutingModule 
  ],
  declarations: [AboutComponent ],

 
})
export class AboutModule { }
