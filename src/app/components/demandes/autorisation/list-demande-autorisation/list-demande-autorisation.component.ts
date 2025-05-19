import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutorisationService } from '../../../../services/demandes/autorisation/autorisation.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-list-demande-autorisation',
  templateUrl: './list-demande-autorisation.component.html',
  styleUrls: ['./list-demande-autorisation.component.css']
})
export class ListDemandeAutorisationComponent implements OnInit {
  demandes: any[] = [];
  loading: boolean = true;

  constructor(
    private autorisationService: AutorisationService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    if (this.authService.getCurentUser().role in ["ADMIN","CHEF"]) {
      this.autorisationService.getAllDemandes().subscribe(
        data => {
          this.demandes = data;
          this.loading = false;
        },
        error => {
          this.toastr.error('Erreur lors du chargement des demandes');
          this.loading = false;
        }
      );
    }else {
      this.autorisationService.getDemandesByUtilisateur(this.authService.getCurentUser().id).subscribe(
        data => {
          this.demandes = data;
          this.loading = false;
        },
        error => {  
          this.toastr.error('Erreur lors du chargement des demandes');
          this.loading = false;
        }
      );
    }
    this.autorisationService.getDemandesByUtilisateur(1).subscribe(
      data => {
        this.demandes = data;
        this.loading = false;
      },
      error => {
        this.toastr.error('Erreur lors du chargement des demandes');
        this.loading = false;
      }
    );
  }

  editDemande(id: number): void {
    this.router.navigate(['/demandes/autorisation/edit', id]);
  }

  deleteDemande(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.autorisationService.deleteDemandeAutorisation(id).subscribe(
        () => {
          this.toastr.success('Demande supprimée avec succès');
          this.loadDemandes();
        },
        error => {
          this.toastr.error('Erreur lors de la suppression de la demande');
        }
      );
    }
  }

  createDemande(): void {
    this.router.navigate(['/demandes/autorisation/create']);
  }
}
