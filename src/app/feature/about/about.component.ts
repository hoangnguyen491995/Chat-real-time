import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import  { Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, Tooltip } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { combineLatest, map, of } from 'rxjs';
import { ButtonComponent } from 'src/app/share/button/button.component';

import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
// import { UserService } from 'src/app/service/user-info/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit  {

  isDeleteModalOpen = false;
  nameDetail: string = "";
  phoneDetail: string = "";
  dateDetail: string = "";
  emailDetail: string = "";



  public deleteModalVisible: boolean = false;
  users: any[] = [
    {  id: 1  , name: 'Nguyễn Văn A', phone: '0123456789', email: 'nguyenvana@example.com', birthday: '24/6/1995'},
    {  id: 2, name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@example.com', birthday: '6/24/1995'},
    {  id: 2, name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@example.com', birthday: '02/02/1995'},
    {  id: 2, name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@example.com', birthday: '02/02/1995'},
    {  id: 2, name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@example.com', birthday: '02/02/1995'},
    {  id: 2, name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@example.com', birthday: '02/02/1995'},
    {  id: 2, name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@example.com', birthday: '02/02/1995'},
  ];
  currentUser: any;


  constructor( )  {
  

    }


  @ViewChildren(ButtonComponent) 
  button: QueryList<ButtonComponent> | undefined;
  @ViewChild('toggleBtn') toggleBtn : ElementRef<HTMLButtonElement> | undefined
  @ViewChild('focus') focus : ElementRef<HTMLInputElement> | undefined
  
  ngOnInit(): void {
    // this.currentUser = this.userService.getCurrentUser();
    // console.log(this.userService.getCurrentUser());

     this.currentUser = localStorage.getItem('currentUser');
  }



 
  ngAfterViewInit(){
    setTimeout(() => {
      this.focus?.nativeElement.focus()
    }, 3000);

  }

  public toggleDeleteModal() {
    this.deleteModalVisible = !this.deleteModalVisible;
  }


  showDetail(user: any) {
     console.log(user);  
      this.nameDetail = user.name;
     this.phoneDetail= user.phone;
     this.dateDetail = user.birthday;
     this.emailDetail  = user.email;
  
  }

}
