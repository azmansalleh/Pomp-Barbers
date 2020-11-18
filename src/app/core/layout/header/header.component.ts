// Angular imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services imports
import { AuthService } from '@services/auth.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    constructor(private auth: AuthService, private router: Router) { }

    isAuthenticated = this.auth.checkAuthentication()


    logout() {
        this.auth.removeLoginToken()
        this.router.navigateByUrl('/login')
    }
}
