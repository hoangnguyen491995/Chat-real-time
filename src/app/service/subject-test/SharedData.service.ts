import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private dataSubject = new Subject<any>();
  private currentStep = new BehaviorSubject<number>(0)

  sendData(data: any) {
    this.dataSubject.next(data);
    console.log("sendata");
  }
  
  getData() {
    console.log("getdata");
    return this.dataSubject.asObservable();
  }
  
  setCurrentStep(step: number){
    console.log(step);
    
     return this.currentStep.next(step)
  }

  getCurrentStep(){
    console.log(this.currentStep.asObservable());
    
    return this.currentStep.asObservable()
  }
}
