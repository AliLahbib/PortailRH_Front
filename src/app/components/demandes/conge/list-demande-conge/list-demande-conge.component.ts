import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CongeService } from '../../../../services/demandes/conge/conge.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-list-demande-conge',
  templateUrl: './list-demande-conge.component.html',
  //   styleUrls: ['./list-demande-conge.component.css']
})
export class ListDemandeCongeComponent implements OnInit {
  demandes: any[] = [];
  loading: boolean = true;

  constructor(
    private congeService: CongeService,
    private router: Router,
    private authService: AuthService,

    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.loadDemandes();
  }

  loadDemandes(): void {
    if (this.authService.getCurentUser().role in ["ADMIN","CHEF"]) {
      this.congeService.getAllDemandesConge().subscribe(
        data => {
          this.demandes = data;
          this.loading = false;
        },
        error => {
          this.toastr.error('Erreur lors du chargement des demandes de congé');
          this.loading = false;
        }
      );
    }else {
      this.congeService.getDemandesByUtilisateur(this.authService.getCurentUser().id).subscribe(
        data => {
          this.demandes = data;
          this.loading = false;
        },
        error => {
          this.toastr.error('Erreur lors du chargement des demandes de congé');
          this.loading = false;
        }
      );
    }
  }

  editDemande(id: number): void {
    this.router.navigate(['/demandes/conge/edit', id]);
  }
  createDemande(): void {
    this.router.navigate(['/demandes/conge/create']);
  }
  deleteDemande(id: number): void {
    // Utilisation de Swal pour confirmation et feedback
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
          this.congeService.deleteDemandeConge(id).subscribe(
            () => {
              Swal.default.fire('Supprimé !', 'La demande a été supprimée.', 'success');
              this.loadDemandes();
            },
            () => Swal.default.fire('Erreur', 'Erreur lors de la suppression', 'error')
          );
        }
      });
    });
  }
}
