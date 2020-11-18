// Angular imports
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

// Services imports
import { AuthService } from '@services/auth.service'

// Auth imports
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private auth: AuthService, private jwtSvc: JwtHelperService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.getLoginToken()) {
      this.auth.setAuthenticated()
      this.routeOnRole(this.jwtSvc.decodeToken(this.auth.getLoginToken())['cognito:groups'][0])    
    }
  }

  submit() {
    if (this.form.valid) {
      this.login()
    }
  }

  routeOnRole(role: string) {
    if (role == 'Admin') {
      this.router.navigate(['admin'])
    }
    else {
      this.router.navigate(['home'])
    }
  }

  async login() {
        try {
          var user = await Auth.signIn(this.form.value.email.toString(), this.form.value.password.toString());
          var tokens = user.signInUserSession;
          if (tokens != null) {
            this.auth.saveLoginToken(tokens)
            this.auth.setAuthenticated()
            this.routeOnRole(this.jwtSvc.decodeToken(this.auth.getLoginToken())['cognito:groups'][0])    
            alert('You are logged in successfully !')
          }
        } catch (error) {
          console.log(error);
          alert('User Authentication failed');
        }
      }
  
}
