import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


import {Store} from '@ngrx/store';

import { AppState, appSlice ,selectValue } from 'src/redux/app.slice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './service/api/Data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit{
  users: any[] = [];
  userForm: FormGroup | undefined;
  
  constructor(private store: Store<{ app: AppState }> , private dataService: DataService, private formBuilder: FormBuilder ) {
  }

   ngOnInit(): void {
  
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required]
    });

    this.dataService.getData()
   }   

  onIncrease() {
    this.store.dispatch(appSlice.actions.increaseValue());
    const state$ = this.store.select(state => state)
    console.log(state$);
  }

  getData() {
    this.dataService.getData().subscribe(
      response => {
        this.users = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}


