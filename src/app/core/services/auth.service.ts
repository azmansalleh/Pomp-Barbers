// Angular imports
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

// Models imports
import { ParamsObj } from '@models/Http';

// RxJS imports
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Environment imports
import { environment } from '../../../environments/environment';

import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    isAuthenticated = false
    currentUser: string

    constructor(private cookieSvc: CookieService, private jwtSvc: JwtHelperService) {}

    saveLoginToken(token: any) {
        this.cookieSvc.set('Token', token.idToken.jwtToken)
        this.isAuthenticated = true
    }

    removeLoginToken() {
        this.cookieSvc.delete('Token')
        this.isAuthenticated = false
    }

    getLoginToken() {
        return this.cookieSvc.get('Token')
    }

    setAuthenticated() {
        this.isAuthenticated = true
    }

    checkAuthentication() {
        if (this.isAuthenticated) {
            return true
        }
    }

}
