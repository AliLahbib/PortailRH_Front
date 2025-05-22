import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/demandes/document/document.service';
import { DemandeDocument } from 'src/app/models/demande-document';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-demande-document',
  templateUrl: './list-demande-document.component.html',
  styleUrls: ['./list-demande-document.component.css']
})
export class ListDemandeDocumentComponent implements OnInit {
  demandes: DemandeDocument[] = [];
  loading = true;

  constructor(private documentService: DocumentService,private router: Router) {}

  ngOnInit(): void {
   this.loadDemandes()
  }
  loadDemandes(): void {
     this.loading = true;
    this.documentService.getAllDemandesMutation().subscribe({
      next: (data) => {
        this.demandes = data;
        console.log("debug demandes ",data)
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Erreur', 'Impossible de charger les demandes de document', 'error');
      }
    })
    ;}

  onDelete(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.deleteDemandeDocument(id).subscribe({
          next: () => {
            this.demandes = this.demandes.filter(d => d.id !== id);
            Swal.fire('Supprimé', 'La demande a été supprimée.', 'success');
          },
          error: () => {
            Swal.fire('Erreur', 'Suppression impossible.', 'error');
          }
        });
      }
    });
  }

  deleteDemande(id: number) {
    this.onDelete(id);
  }

  createDemande() {
        this.router.navigate(['/demandes/document/create']);

  }

   editDemande(id: number): void {
    this.router.navigate(['/demandes/document/edit', id]);
  }
}
