import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Auth } from '../services/authservice';
import { Route, Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``,
})
export class Login implements OnInit {
  user = new User();
  err: number = 0;
  constructor(private authService: Auth, private router: Router) { }
  ngOnInit(): void { }
  /*
  onLoggedin() {
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser) this.router.navigate(['/']);
    else this.erreur=1;
  }*/
  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
      }
    });
  }
}