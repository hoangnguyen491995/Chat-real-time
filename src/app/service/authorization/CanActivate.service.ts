import { Injectable } from '@angular/core';
import { UserService } from '../user-info/user.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  public isLogin: boolean = false;


  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLogin) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }





}
