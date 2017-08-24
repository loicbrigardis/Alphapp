import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { User } from "../auth/user.model";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  responseMsg: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    })
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
  

  logIn() {
    this.responseMsg = 'Loading...';
    let email = this.form.get('email').value;
    let password = this.form.get('password').value;

    let user = new User(email, password);

    this.authService.logIn(user).subscribe(
      data => {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('userId', data.userId);
        this.responseMsg = data.message;
        this.form.reset();
        this.authService.userIsLogin();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 400);
      },
      error => {
        this.responseMsg = error.message;
      }
    )
  }

}
