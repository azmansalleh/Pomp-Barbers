// Angular imports
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.valid) {
      this.login()
    }
  }

  async login() {
        try {
          var user = await Auth.signIn(this.form.value.email.toString(), this.form.value.password.toString());
          console.log('Authentication performed for user=' + this.form.value.email + 'password=' + this.form.value.password + ' login result==' + user);
          var tokens = user.signInUserSession;
          if (tokens != null) {
            console.log('User authenticated');
            this.router.navigate(['home']);
            alert('You are logged in successfully !');
          }
        } catch (error) {
          console.log(error);
          alert('User Authentication failed');
        }
      }
  
}
