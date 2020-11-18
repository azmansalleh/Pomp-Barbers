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
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private jwtSvc: JwtHelperService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    try {
     if (this.jwtSvc.decodeToken(this.auth.getLoginToken())['cognito:groups'][0]) {
      return true
     }

    } catch (error) {
      this._router.navigate(['/home'])
      console.log('Hey that"s illegal!')
      return false
    }
  }
  
}