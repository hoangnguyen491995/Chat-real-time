import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  private isPopoverVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isPopoverVisible$ = this.isPopoverVisibleSubject.asObservable();

  private isPopoverVisibleSubject2: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isPopoverVisible$2 = this.isPopoverVisibleSubject2.asObservable();


  constructor() { }

  public togglePopover(): void {
    this.isPopoverVisibleSubject.next(!this.isPopoverVisibleSubject.value);
  }

  public setPopoverVisibility(isVisible: boolean): void {

    this.isPopoverVisibleSubject.next(isVisible);
  }


  public togglePopover2(): void {
    this.isPopoverVisibleSubject2.next(!this.isPopoverVisibleSubject2.value);
  }

  public setPopoverVisibility2(isVisible: boolean): void {

    this.isPopoverVisibleSubject2.next(isVisible);
  }



}
