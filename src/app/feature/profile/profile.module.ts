import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { LoginRouterModule } from './profile-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { ListUserComponent } from './listUser/listUser.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { ShareModule } from 'src/app/share/share.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, Validators, FormsModule} from '@angular/forms';
import { Step2Component } from './test/step2/step2.component';
import { Step3Component } from './test/step3/step3.component';
import { Step1Component } from './test/step1/step1.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule, LoginRouterModule, MatTabsModule, MatIconModule, 
    MatMenuModule,ShareModule, MatFormFieldModule,
    MatInputModule, ReactiveFormsModule, MatButtonModule, MatStepperModule,  FormsModule, MatCheckboxModule
  ],
  declarations: [ProfileComponent , ListUserComponent, TestComponent, Step3Component,Step2Component,Step1Component ]
})
export class ProfileModule {
 
 }





