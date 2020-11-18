// Angular imports
import { Injectable } from '@angular/core';

// Auth imports
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    isAuthenticated = false
    currentUser: string

    constructor(private cookieSvc: CookieService) {}

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

    decryptToken() {
        
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
