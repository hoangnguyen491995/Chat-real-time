/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotiComponent } from './noti.component';

describe('NotiComponent', () => {
  let component: NotiComponent;
  let fixture: ComponentFixture<NotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
