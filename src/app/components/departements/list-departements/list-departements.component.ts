import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../../../services/departements/demande.service';
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

  constructor(
    private departementService: DemandeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartements();
  }

  loadDepartements(): void {
    this.loading = true;
    this.departementService.getAllDepartements().subscribe({
      next: (data) => {
        this.departements = data;
        console.log("debug departements ",data)
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des départements';
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
      this.departementService.deleteDepartement(id).subscribe({
        next: () => {
          this.loadDepartements();
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression du département';
          console.error(err);
        }
      });
    }
  }
} 