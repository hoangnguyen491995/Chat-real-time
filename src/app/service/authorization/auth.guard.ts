import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public isLogin: boolean = false;
  private currentUser: any;
  user: any;
  constructor(private router: Router) { }

  getCurrentUser() {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      this.user = JSON.parse(currentUserString);
      console.log(this.user);

      this.isLogin = true
    } else {
      console.log('Không có dữ liệu trong localStorage');
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.getCurrentUser();
    console.log(state.url);
    
    if (this.isLogin) {
      if (this.user.role == 'ADMIN') {
        return true;
      } else if (this.user.role == 'USER') {
        if (state.url.includes('home') || state.url.includes('register') || state.url.includes('about') || state.url.includes('login')) {
          console.log(state);
          return true;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'not authorization!!',
            showCancelButton: true,
            showConfirmButton: false
          });
          return this.router.createUrlTree(['/home']);
        }
      }
    } else {
      if (state.url.includes('login') || state.url.includes('register')) {
        return true;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'not authentication!',
          showCancelButton: true,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/login']);
          return false; 
        });
      }
    }
    return this.router.createUrlTree(['/login']);
  }

}
