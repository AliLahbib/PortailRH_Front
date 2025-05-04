import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  navigateToEditUser(): void {
    this.router.navigate(['/users/edit', this.userId]);
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      console.log("debug success");

      this.userService.changePassword(this.userId, newPassword).subscribe(
        (response) => {
          console.log("debug success",response.error.text);
          this.loading = false;
          this.successMessage = 'Mot de passe modifié avec succès';
          setTimeout(() => {
            this.navigateToEditUser();
          }, 2000);
        },
      
      );
    }
  }
} 