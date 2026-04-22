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
    let isloggedin: string;
    let loggedUser: string;
    isloggedin = localStorage.getItem('isloggedIn')!;
    loggedUser = localStorage.getItem('loggedUser')!;
    if (isloggedin != 'true' || !loggedUser) this.router.navigate(['/login']);
    else this.auth.setLoggedUserFromLocalStorage(loggedUser);
  }
  onLogout() {
    this.auth.logout();
  }
}
