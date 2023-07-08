import { Component, OnInit } from '@angular/core';
import { map, of } from 'rxjs';
import { DataService } from 'src/app/service/api/Data.service';

@Component({
  selector: 'app-adminNoti',
  templateUrl: './adminNoti.component.html',
  styleUrls: ['./adminNoti.component.css']
})
export class AdminNotiComponent implements OnInit {

  currentDate: Date | undefined;

  usersNoti: any[] = [];

  users: any[] = [
    {  id: 1  , name: 'Nguyễn Văn A', phone: '0123456789', email: 'nguyenvana@example.com', birthday: '24/6/1995'},
    {  id: 2, name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@example.com', birthday: '6/24/1995'},
    {  id: 2, name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@example.com', birthday: '02/02/1995'},
    {  id: 2, name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@example.com', birthday: '02/02/1995'},
    {  id: 2, name: 'Trần Thị Bờm', phone: '0987654321', email: 'tranthib@example.com', birthday: '6/24/1995'},
    {  id: 2, name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@example.com', birthday: '02/02/1995'},
    {  id: 2, name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@example.com', birthday: '02/02/1995'},
  ];

  number = this.usersNoti.length;

  constructor(private dataService : DataService) { }

  ngOnInit() {


    this.getListNoti()

    of(...this.users).pipe(
      map((user: any) => {
        const currentDate = new Date();
        const birthday = new Date(user.birthday);
        if (
          currentDate.getDate() === birthday.getDate() &&
          currentDate.getMonth() === birthday.getMonth()
        ) {
          this.usersNoti.push(user);
          
          setTimeout(() => {
            const index = this.usersNoti.indexOf(user);
            if (index !== -1) {
              this.usersNoti.splice(index, 1);
            }
          }, 500000);
        }
      })
    ).subscribe();

    
  }



  getListNoti() {
    // Make HTTP request to login API
    this.dataService.getDataNoti().subscribe({
      next: (response) => {
        // Handle the successful response here
        console.log('lấy thông báo successful', response);
         this.usersNoti= response
         this.number = this.usersNoti.length;
        // window.location.href = '/home';

      },
      error: (error) => {
        // Handle the error response here
        console.error('delete user error', error);
        
      }
    });

  }

}
