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
    console.log("debug user ", this.authService.getCurentUser())
    this.loadDemandes();
  }

  loadDemandes(): void {
    console.log("debug role ", this.authService.getCurentUser().role)
    if (this.authService.getCurentUser().role == "ADMIN" || this.authService.getCurentUser().role == "CHEF") {
      this.autorisationService.getAllDemandes().subscribe(
        data => {
          console.log("debug admin demandes ", data)

          this.demandes = data;
          this.loading = false;
        },
        error => {
          this.toastr.error('Erreur lors du chargement des demandes');
          this.loading = false;
        }
      );
    } else {
      this.autorisationService.getDemandesByUtilisateur(this.authService.getCurentUser().id).subscribe(
        data => {
          
          this.demandes = data;
          console.log("debug employe demandes ", this.demandes)

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
    import('sweetalert2').then(Swal => {
      Swal.default.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Cette action est irréversible !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler'
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.autorisationService.deleteDemandeAutorisation(id).subscribe(
            () => {
              Swal.default.fire('Supprimé !', 'La demande a été supprimée.', 'success');
              this.loadDemandes();
            },
            () => Swal.default.fire('Erreur', 'Erreur lors de la suppression de la demande', 'error')
          );
        }
      });
    });
  }

  createDemande(): void {
    this.router.navigate(['/demandes/autorisation/create']);
  }
}
