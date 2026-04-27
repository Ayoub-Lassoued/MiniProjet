import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/authservice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {

  authService = inject(Auth);

  myForm!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister() {

    // ✅ validation form
    if (this.myForm.invalid) {
      this.toastr.error("Veuillez remplir tous les champs correctement");
      return;
    }

    const formData = this.myForm.value;

    // ✅ check password match
    if (formData.password !== formData.confirmPassword) {
      this.toastr.error("Les mots de passe ne correspondent pas");
      return;
    }

    this.loading = true;

    this.authService.registerUser(formData).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success("Vérifiez votre email pour confirmation");
        this.router.navigate(['/verifEmail']);
      },
      error: (err: any) => {
        this.loading = false;

        if (err.status === 400) {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.error("Erreur lors de l'inscription");
        }
      }
    });
  }
}