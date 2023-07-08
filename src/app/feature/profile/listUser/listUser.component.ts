import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/service/api/Data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listUser',
  templateUrl: './listUser.component.html',
  styleUrls: ['./listUser.component.css']
})
export class ListUserComponent implements OnInit {
  users: any
  userCurrent: any
  user: any
  filteredUsers: any
  constructor(private dataApi: DataService, private router: Router) {

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.userCurrent = JSON.parse(currentUser)
    }
    console.log(" user", this.userCurrent);

  }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    // Make HTTP request to login API
    this.dataApi.getData().subscribe({
      next: (response) => {
        console.log('lấy user successful', response);
        this.users = response
        this.filteredUsers = this.users.filter((user: { id: any; }) => user.id !== this.userCurrent.id);
      },
      error: (error) => {
        // Handle the error response here
        console.error('delete user error', error);
      }
    });
  }

  handeCreateChat(idFrient: number) {
    const requestData = {
      userId: this.userCurrent.id,
      friendId: idFrient
    };
    console.log(requestData);
    this.dataApi.createChat(requestData).subscribe(
      (response) => {
        console.log('API response:', response);
        window.location.href = 'home';
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }

  handleInfoFriend(idFrient: number) {
    this.router.navigate(['user/profile', idFrient]);


    window.location.href = `user/profile/${idFrient}`;

  }

}
