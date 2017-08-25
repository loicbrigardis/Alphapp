import { Router } from '@angular/router';
import { getTestBed } from '@angular/core/testing';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {   
  }
  

  isLoggedIn() {
    return this.authService.userIsLogin();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
