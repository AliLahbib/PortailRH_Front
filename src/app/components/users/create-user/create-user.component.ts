import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from '../../../models/Utilisateur';
import { Departement } from '../../../models/departement';
import { UserService } from '../../../services/user/user.service';
import { DepartementService } from '../../../services/departements/departement.service';
import { RoleEnum } from '../../../models/role.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userId: number;
  userForm: FormGroup;  
  loading = false;
  error = '';
  departments: Departement[] = [];
  roles = Object.values(RoleEnum);

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private departementService: DepartementService
  ) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      departement: ['']
    });
  }

  ngOnInit(): void {
       this.loadDepartments();
    
    
   
  }

  
  loadDepartments(): void {
    this.departementService.getAllDepartements().subscribe(
      (departments: Departement[]) => {
        this.departments = departments;
      },
      error => {
        console.error('Error loading departments:', error);
        this.error = 'Erreur lors du chargement des départements';
      }
    );
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.loading = true;
      const createdUser: Utilisateur = {
        ...this.userForm.value
      };

      this.userService.createUser(createdUser).subscribe(
        () => {
          this.loading = false;
          Swal.fire({
            title: 'Succès!',
            text: 'Utilisateur créer avec succès',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/users']);
          });
        },
        error => {
          this.loading = false;
          console.error('Error updating user:', error);
          this.error = 'Erreur lors de la mise à jour de l\'utilisateur';
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }

}
