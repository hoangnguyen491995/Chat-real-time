import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/service/subject-test/SharedData.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  constructor(private shareData : SharedDataService) { }

  ngOnInit() {
    this.shareData.setCurrentStep(2)
  }

}
