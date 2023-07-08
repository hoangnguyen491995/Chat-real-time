import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MenuPositionX, MenuPositionY } from '@angular/material/menu';
import { Router } from '@angular/router';
import { DataService1 } from 'src/app/service/data/Data.service';
import { PopoverService } from 'src/app/service/popover/popover.service';

// import { UserService } from 'src/app/service/user-info/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-headerEmployee',
  templateUrl: './headerEmployee.component.html',
  styleUrls: ['./headerEmployee.component.css'],

})
export class HeaderEmployeeComponent implements OnInit {
  isPopoverOpen = false;
  user: any
  userCurrent: any;
  notiNumber!: number;
  constructor(private elementRef: ElementRef, public popoverService: PopoverService, private router: Router, private dataService: DataService1) {
    //  this.userCurrent =  this.userService.getCurrentUser();
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      this.user = JSON.parse(currentUser)
    }
  }
  ;

  ngOnInit(): void {
  }

  notiBirthdayInDay = false;
  notiBirthdayInMonth = false;

  get isLogin(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(this.user));

      const today = new Date();
      const userBirthday = new Date(parsedUser.birthday);
      if (
        today.getMonth() === userBirthday.getMonth() &&
        today.getDate() === userBirthday.getDate()

      ) {
        this.notiNumber = 1;
        this.notiBirthdayInDay = true;
      }

      if (today.getMonth() === userBirthday.getMonth()) {
        this.notiNumber = 1;
        this.notiBirthdayInMonth = true; 
      }
    }
    return localStorage.getItem('currentUser') !== undefined;
  }


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isPopoverOpen = false;
    }
  }

  handleLogout() {
    localStorage.removeItem('currentUser');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'logout Success',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.href = '/login';
    })

  }


  isDropdownVisible: boolean = false;

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  isDropdownVisible1: boolean = false;

  toggleDropdown1(): void {
    this.isDropdownVisible1 = !this.isDropdownVisible1;
  }

  onMessageClick() {
    this.popoverService.setPopoverVisibility(true);
  }


  routeHome() {
    this.router.navigate(['home']);
  }
  routeAbout() {
    this.router.navigate(['about']);
  }

  GetProfile() {
    this.router.navigate(['user/profile', this.user.id]);
  }


  saveData(): void {
    const data = { name: 'John', age: 25 };
    this.dataService.setData(data);
  }

  loadData(): void {
    const data = this.dataService.getData();
    console.log(data);
  }

}
