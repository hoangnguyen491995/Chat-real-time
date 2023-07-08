import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService1 {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  setData(data: any): void {
    this.dataSubject.next(data);
  }

  getData(): any {
    return this.dataSubject.getValue();
  }
}
