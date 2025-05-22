import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MutationService } from 'src/app/services/demandes/mutation/mutation.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DemandeMutation } from 'src/app/models/demande-mutation';

@Component({
  selector: 'app-list-demande-mutation',
  templateUrl: './list-demande-mutation.component.html',
  styleUrls: ['./list-demande-mutation.component.css']
})
export class ListDemandeMutationComponent implements OnInit {
  demandes: DemandeMutation[] = [];
  loading = true;

  constructor(
    private mutationService: MutationService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    const user = this.authService.getCurentUser();
    if (user.role === 'ADMIN' || user.role === 'CHEF') {
      this.mutationService.getAllDemandesMutation().subscribe(
        data => {
          this.demandes = data;
          this.loading = false;
        },
        () => {
          this.toastr.error('Erreur lors du chargement des demandes de mutation');
          this.loading = false;
        }
      );
    } else {
      this.mutationService.getDemandesMutationByUtilisateur(user.id).subscribe(
        data => {
          this.demandes = data;
          this.loading = false;
        },
        () => {
          this.toastr.error('Erreur lors du chargement des demandes de mutation');
          this.loading = false;
        }
      );
    }
  }

  editDemande(id: number): void {
    this.router.navigate(['/demandes/mutation/edit', id]);
  }

  createDemande(): void {
    this.router.navigate(['/demandes/mutation/create']);
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
          this.mutationService.deleteDemandeMutation(id).subscribe(
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
