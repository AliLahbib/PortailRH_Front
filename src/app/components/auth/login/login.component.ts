import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      matricule: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { matricule, password } = this.loginForm.value;
      this.authService.login(matricule, password).subscribe({
        next: (user) => {
          console.log('Utilisateur connecté:', user);
          // this.router.navigate(['/']);
          window.location.href = '/'; // Redirection vers la page d'accueil
        },
        error: (error) => {
          this.errorMessage = 'Matricule ou mot de passe incorrect';
          console.error('Erreur de connexion:', error);
        }
      });
    }
  }
} 