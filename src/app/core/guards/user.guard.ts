import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

//Services imports
import {AuthService} from '../services/auth.service'

// Auth imports
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private auth: AuthService, private jwtSvc: JwtHelperService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this.jwtSvc.decodeToken(this.auth.getLoginToken())['cognito:groups'][0]) {
    //   return true;
    // }

    // this._router.navigate(['/admin']);
    // return false;

    try {
      if (this.jwtSvc.decodeToken(this.auth.getLoginToken())['cognito:groups'][0]) {
        this._router.navigate(['/admin'])
        return false
      }
 
     } catch (error) {
      this._router.navigate(['/home'])
      return true
    }




  }
  
}