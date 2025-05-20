import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeFormation } from 'src/app/models/demande-formation';
import { FormationService } from 'src/app/services/demandes/formation/formation.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-list-demande-formation',
  templateUrl: './list-demande-formation.component.html',
  styleUrls: ['./list-demande-formation.component.css']
})
export class ListDemandeFormationComponent implements OnInit {
  demandes: DemandeFormation[] = [];
  loading = false;
  errorMsg = '';

  constructor(private formationService: FormationService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchDemandes();
  }

  fetchDemandes(): void {
    this.loading = true;
    if (this.authService.getCurentUser().role in ["ADMIN","CHEF"]) {
      this.formationService.getAllDemandesFormation().subscribe({
        next: (data) => {
          this.demandes = data;
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'Erreur lors du chargement des demandes.';
          this.loading = false;
        }
      });
    }else {
      this.formationService.getDemandesFormationByUtilisateurId(this.authService.getCurentUser().id).subscribe({
        next: (data) => {
          this.demandes = data;
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'Erreur lors du chargement des demandes.';
          this.loading = false;
        }
      });
    }

  }

  editDemande(id: number): void {
    this.router.navigate(['/demandes/formation/edit', id]);
  }

  deleteDemande(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette demande ?')) {
      this.formationService.deleteDemandeFormation(id).subscribe({
        next: () => this.fetchDemandes(),
        error: () => this.errorMsg = 'Erreur lors de la suppression.'
      });
    }
  }

  createDemande(): void { //creat
    this.router.navigate(['/demandes/formation/create']);
  }
}
