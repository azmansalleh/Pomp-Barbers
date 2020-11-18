// Angular imports
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

// Material imports
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    givenName: new FormControl('', Validators.required),
    familyName: new FormControl('', Validators.required),
  });

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.valid) {
      this.register()
    }
  }

  async register(){
    try {
      const user = Auth.signUp({
        username: this.form.value.email,
        password: this.form.value.password,
        attributes: {
          email: this.form.value.email,
          given_name: this.form.value.givenName,
          family_name: this.form.value.familyName
        }
        
      });
      this.openSnackBar('User signup completed. Please check your email', 'success')
      this.router.navigate(['login']);
    } catch (error) {
      this.openSnackBar('User signup failed! Please try again', 'error')
    }
  }

  /**
   * Shows toasts
   * @param msg 
   * @param type 
   */
  openSnackBar(msg: string, type: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 5000,
      panelClass: [type],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  
}
