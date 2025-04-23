import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UserService } from 'src/app/services/user/user.service';
import { DepartementService } from '../../../services/departements/departement.service';
import { Departement } from 'src/app/models/departement';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userId: number;
  utilisateurForm: FormGroup;  // Formulaire réactif
  isEditMode: boolean = false; // Variable pour vérifier si on est en mode édition
  isNew = true;
  loading = false;
  error = '';
  departements: Departement[] = [];

  constructor(
    private fb: FormBuilder, // Injection de FormBuilder
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private departementService: DepartementService
  ) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      role: ['EMPLOYE', Validators.required],
      departementId: [null]
    });
  }

  ngOnInit(): void {
    this.loadDepartements();
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId) {
      this.isEditMode = true;
      this.isNew = false;
      this.userService.getUserById(this.userId).subscribe({
        next: (userData: Utilisateur) => {
          this.utilisateurForm.patchValue({
            ...userData,
            departementId: userData.departement?.id
          });
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement de l\'utilisateur';
          console.error(err);
        }
      });
    }
  }

  loadDepartements(): void {
    this.departementService.getAllDepartements().subscribe({
      next: (data) => {
        this.departements = data;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des départements';
        console.error(err);
      }
    });
  }

  saveUser(): void {
    if (this.utilisateurForm.valid) {
      this.loading = true;
      const userData = this.utilisateurForm.value;

      // Préparer les données pour l'API
      const apiData = {
        ...userData,
        departement: userData.departementId ? { id: userData.departementId } : { id: null }
      };

      if (this.isEditMode) {
        this.userService.updateUser(this.userId, apiData).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Succès !',
              text: 'Utilisateur mis à jour avec succès',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/users']);
            });
          },
          error: (err) => {
            this.error = 'Erreur lors de la mise à jour de l\'utilisateur';
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Erreur !',
              text: 'Une erreur est survenue lors de la mise à jour',
            });
            console.error(err);
          }
        });
      } else {
        this.userService.createUser(apiData).subscribe({
          next: (createdUser) => {
            Swal.fire({
              icon: 'success',
              title: 'Succès !',
              text: `Utilisateur ${createdUser.nom} ${createdUser.prenom} créé avec succès`,
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/users']);
            });
          },
          error: (err) => {
            this.error = 'Erreur lors de la création de l\'utilisateur';
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Erreur !',
              text: 'Une erreur est survenue lors de la création',
            });
            console.error(err);
          }
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }

}
