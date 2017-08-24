import { User } from './../auth/user.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  responseMsg: string = '';

  constructor(
    private router: Router,
    private authService: AuthService, 
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'password': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]]
    });
  }

  get firstname(): any {
    return this.form.get('firstname');
  }
  get lastname(): any {
    return this.form.get('lastname');
  }
  get password(): any {
    return this.form.get('password');
  }
  get email(): any {
    return this.form.get('email');
  }
  
  signUp() {
    this.responseMsg = 'Loading...';
    if (this.form.valid) {
      let user = new User(this.form.value.email, this.form.value.password, this.form.value.firstname, this.form.value.lastname);
      this.authService.signUp(user)
        .subscribe(data => {
          this.responseMsg = data.message;
          this.form.reset();
          setTimeout( () => {
            this.router.navigate(['/login'])
          }, 400);
        }, (error) => {
          this.responseMsg = error.message;
        });
    }    
  }

}
