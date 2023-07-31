import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/service/subject-test/SharedData.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  constructor(private shareData : SharedDataService) { }

  ngOnInit() {
    this.shareData.setCurrentStep(3)
  }
}
