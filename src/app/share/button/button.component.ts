import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private router: Router) {}
  @Input() checked: boolean | undefined ;
  ngOnInit() {
  }
  login() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

   toggle(){
     
  }

}
