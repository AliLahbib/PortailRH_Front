import { Component, OnInit } from '@angular/core';
import { DepartementService } from '../../../services/departements/departement.service';
import { Router } from '@angular/router';
import { Departement } from 'src/app/models/departement';

@Component({
  selector: 'app-list-departements',
  templateUrl: './list-departements.component.html',
})
export class ListDepartementsComponent implements OnInit {
  departements: Departement[] = [];
  loading = false;
  error = '';
  successMessage = '';

  constructor(
    private departementService: DepartementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartements();
  }

  loadDepartements(): void {
    this.loading = true;
    this.error = '';
    this.departementService.getAllDepartements().subscribe({
      next: (data) => {
        this.departements = data;
        console.log("debug departements ",data)
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors du chargement des départements';
        this.loading = false;
        console.error(err);
      }
    });
  }

  editDepartement(id: number): void {
    this.router.navigate(['/departements/edit', id]);
  }

  deleteDepartement(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce département ?')) {
      this.loading = true;
      this.error = '';
      this.departementService.deleteDepartement(id).subscribe({
        next: () => {
          this.successMessage = 'Département supprimé avec succès';
          this.loadDepartements();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Erreur lors de la suppression du département';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
} 