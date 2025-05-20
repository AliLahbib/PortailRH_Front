import { Component, OnInit } from '@angular/core';
import { FormationService } from '../services/formation.service';

@Component({
  selector: 'app-demande-formation',
  templateUrl: './demande-formation.component.html',
  styleUrls: ['./demande-formation.component.css']
})
export class DemandeFormationComponent implements OnInit {
  demandes: any[] = [];

  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    this.fetchDemandes();
  }

  fetchDemandes(): void {
    this.formationService.getDemandesFormation().subscribe(data => {
      this.demandes = data;
    });
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
          this.formationService.deleteDemandeFormation(id).subscribe({
            next: () => {
              Swal.default.fire('Supprimé !', 'La demande a été supprimée.', 'success');
              this.fetchDemandes();
            },
            error: () => Swal.default.fire('Erreur', 'Erreur lors de la suppression.', 'error')
          });
        }
      });
    });
  }
}