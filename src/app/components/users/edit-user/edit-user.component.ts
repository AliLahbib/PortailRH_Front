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
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userId: number;
  userForm: FormGroup;  // Formulaire réactif
  loading = false;
  error = '';
  departments: Departement[] = [];
  roles = Object.values(RoleEnum);

  constructor(
    private fb: FormBuilder, // Injection de FormBuilder
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private departementService: DepartementService
  ) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      matricule: ['', Validators.required],
      role: ['', Validators.required],
      departement: ['']
    });
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUser();
    this.loadDepartments();
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe(
      (user: Utilisateur) => {
        this.userForm.patchValue({
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          matricule: user.matricule,
          role: user.role,
          departement: user.departement?.id
        });
      },
      error => {
        console.error('Error loading user:', error);
        this.error = 'Erreur lors du chargement de l\'utilisateur';
      }
    );
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
      this.loading = true;
      const updatedUser: Utilisateur = {
        ...this.userForm.value,
        id: this.userId
      };

      this.userService.updateUser(this.userId, updatedUser).subscribe(
        () => {
          this.loading = false;
          Swal.fire({
            title: 'Succès!',
            text: 'Utilisateur mis à jour avec succès',
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
