import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../model/user.model';
import { Auth } from '../services/authservice';

@Component({
  selector: 'app-verif-email-component',
  imports: [FormsModule],
  templateUrl: './verif-email-component.html',
  styleUrl: './verif-email-component.css',
})
export class VerifEmailComponent {
  code: string = '';
  user: User = new User();
  err = '';
  constructor(
    private route: ActivatedRoute,
    private authService: Auth,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.user = this.authService.registredUser;
  }
  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert('Login successful');
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      },
      error: (err: any) => {
        if ((err.status = 400)) {
          this.err = err.error.message;
        }
        console.log(err.errorCode);
      },
    });
  }
}