import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Auth } from '../services/authservice';
import { Route, Router, RouterLink } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styles: ``,
})
export class LoginComponent {

  user = new User();
  erreur = 0;
  message: string = "login ou mot de passe erronés..";

  constructor(private authService: Auth,
    private router: Router) { }

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.erreur = 1;

        switch (err.status) {
          case 403:
            this.message = "Utilisateur désactivé, Veuillez contacter votre Administrateur";
            break;
          case 401:
            this.message = "Login ou mot de passe erronés..";
            break;
          default:
            this.message = "Erreur serveur, réessayez.";
        }
      }
    });

  }




}