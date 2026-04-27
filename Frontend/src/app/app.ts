import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from './services/authservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule,
    RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {



  protected readonly title = signal('telephone');

  constructor(public auth: Auth, private router: Router) { }

  ngOnInit() {
    this.auth.loadToken();

    if (!this.auth.token || this.auth.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
  }

  onLogout() {
    this.auth.logout();
  }
}
