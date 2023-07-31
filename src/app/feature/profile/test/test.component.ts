import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/service/subject-test/SharedData.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  receivedData: any;
  private subscription!: Subscription;


  userInfo = {
    userName: 'Nguyễn Đăng hoàng',
    password: '12345',
    rememberMe: true,
  }

  constructor(private sharedDataService: SharedDataService) {
   }

  ngOnInit() {
  }

  HandleTest(){
    this.subscription = this.sharedDataService.getData().subscribe((data) => {
      console.log(data);
      
      this.receivedData = data;
    });
  }
  onSubmit(signInForm : NgForm){
    
    console.log(signInForm.value); 

    console.log(this.userInfo);
  }
}
