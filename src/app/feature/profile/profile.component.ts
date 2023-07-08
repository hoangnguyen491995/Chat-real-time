import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/api/Data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any
  constructor(private dataServiceApi: DataService, private route: ActivatedRoute,) {

    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      this.user = JSON.parse(currentUser)
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserData();
    });
  }

  userId!: string;
  userData= {
    username: "",
    email: "",
    birthday : " ",
    phone: ""
  }

  getUserData() {
    console.log(this.userId);
    this.dataServiceApi.getUserById(this.userId).subscribe(data => {
      console.log(data);

      this.userData = data;
    });
  }

}
