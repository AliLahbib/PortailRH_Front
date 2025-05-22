import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/demandes/document/document.service';
import { DemandeDocument } from 'src/app/models/demande-document';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-demande-document',
  templateUrl: './edit-demande-document.component.html',
  styleUrls: ['./edit-demande-document.component.css']
})
export class EditDemandeDocumentComponent implements OnInit {
  demandeForm!: FormGroup;
  demandeId?: number;
  isEditMode = false;
  isLoading = true;

  typeDocumentOptions = [
    { value: 'ATTESTATION_TRAVAIL', label: 'Attestation de travail' },
    { value: 'ATTESTATION_SALAIRE', label: 'Attestation de salaire' },
    { value: 'BULLETIN_PAIE', label: 'Bulletin de paie' },
    { value: 'CONTRAT_DUPLICATA', label: 'Duplicata de contrat' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.demandeId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.demandeId;
    this.demandeForm = this.fb.group({
      typeDocument: ['', Validators.required],
      commentaire: [''],
      justificatifURL: ['']
    });
    if (this.isEditMode) {
      this.documentService.getDemandeDocumentById(this.demandeId!).subscribe({
        next: (demande) => {
          this.demandeForm.patchValue(demande);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          Swal.fire('Erreur', 'Impossible de charger la demande', 'error');
          this.router.navigate(['/demandes/document']);
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.demandeForm.invalid) return;
    const demande: DemandeDocument = { ...this.demandeForm.value };
    this.isLoading = true;
    if (this.isEditMode && this.demandeId) {
      this.documentService.updateDemandeDocument(this.demandeId, demande).subscribe({
        next: () => {
          Swal.fire('Succès', 'Demande modifiée avec succès', 'success').then(() => {
            this.router.navigate(['/demandes/document']);
          });
        },
        error: () => {
          this.isLoading = false;
          Swal.fire('Erreur', 'Modification impossible', 'error');
        }
      });
    } else {
      this.documentService.createDemandeDocument(demande).subscribe({
        next: () => {
          Swal.fire('Succès', 'Demande créée avec succès', 'success').then(() => {
            this.router.navigate(['/demandes/document']);
          });
        },
        error: () => {
          this.isLoading = false;
          Swal.fire('Erreur', 'Création impossible', 'error');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/demandes/document']);
  }
}
