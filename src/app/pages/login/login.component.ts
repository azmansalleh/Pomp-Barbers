// Angular imports
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

// Services imports
import { AuthService } from '@services/auth.service'

// Auth imports
import { JwtHelperService } from "@auth0/angular-jwt";

// Material imports
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private auth: AuthService, private jwtSvc: JwtHelperService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.auth.getLoginToken()) {
      this.auth.setAuthenticated()

      try {
        this.routeOnRole(this.jwtSvc.decodeToken(this.auth.getLoginToken())['cognito:groups'][0]) 
      } catch (error) {
        this.router.navigate(['home'])
      }

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
  }

  /**
   * Shows toasts
   * @param msg 
   * @param type 
   */
  openSnackBar(msg: string, type: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      panelClass: [type],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  async login() {
        try {
          var user = await Auth.signIn(this.form.value.email.toString(), this.form.value.password.toString());
          var tokens = user.signInUserSession;
          if (tokens != null) {
            this.auth.saveLoginToken(tokens)
            this.auth.setAuthenticated()

            try {
              this.routeOnRole(this.jwtSvc.decodeToken(this.auth.getLoginToken())['cognito:groups'][0]) 
            } catch (error) {
              this.router.navigate(['home'])
            }
            
            this.openSnackBar('Login successful!', 'success')
          }
        } catch (error) {
          console.log(error);
          this.openSnackBar('Login failed! Please try again', 'error')
        }
      }
  
}
