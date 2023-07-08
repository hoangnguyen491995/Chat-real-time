import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UserService } from 'src/app/service/user-info/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isPopoverOpen = false;
  user : any
  showContent = false
  constructor(private elementRef: ElementRef, private router: Router) { 

    const currentUser = localStorage.getItem('currentUser'); 
    if (currentUser) {
     
      // localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.user = JSON.parse(currentUser )
      console.log(this.user);
      
    }
  }

  ngOnInit() {
  }
  togglePopover(): void {
    this.isPopoverOpen = !this.isPopoverOpen;
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

  handleUser(){
    this.router.navigate(['/admin/manage/user']);

  }

  handleNoti(){
    this.router.navigate(['/admin/manage/notification']);

  }
}
