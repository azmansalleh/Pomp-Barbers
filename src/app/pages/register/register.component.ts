// Angular imports
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Auth } from 'aws-amplify';

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

  constructor() { }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.valid) {
      this.register()
    }
  }

  register(){
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

      console.log({ user });
      alert('User signup completed , please check verify your email.')
      //this.router.navigate(['login']);
    } catch (error) {
      console.log('Error signing up:', error)
    }
  }
  
}
