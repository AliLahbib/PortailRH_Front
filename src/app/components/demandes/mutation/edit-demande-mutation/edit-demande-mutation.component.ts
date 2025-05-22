import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MutationService } from 'src/app/services/demandes/mutation/mutation.service';
import { DemandeMutation } from 'src/app/models/demande-mutation';

@Component({
  selector: 'app-edit-demande-mutation',
  templateUrl: './edit-demande-mutation.component.html',
  styleUrls: ['./edit-demande-mutation.component.css']
})
export class EditDemandeMutationComponent implements OnInit {
  demandeForm: FormGroup;
  isEditMode = false;
  demandeId?: number;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private mutationService: MutationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.demandeForm = this.fb.group({
      serviceActuel: ['', Validators.required],
      serviceSouhaite: ['', Validators.required],
      motif: ['', Validators.required],
      commentaire: [''],
      justificatifURL: ['']
    });
  }

  ngOnInit(): void {
    this.demandeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.demandeId) {
      this.isEditMode = true;
      this.loading = true;
      this.mutationService.getDemandeMutationById(this.demandeId).subscribe({
        next: (demande) => {
          this.demandeForm.patchValue(demande);
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'Erreur lors du chargement de la demande.';
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.demandeForm.invalid) return;
    this.loading = true;
    const demande: DemandeMutation = this.demandeForm.value;
    import('sweetalert2').then(Swal => {
      Swal.default.fire({
        title: 'Confirmer',
        text: this.isEditMode ? 'Voulez-vous vraiment modifier cette demande ?' : 'Voulez-vous vraiment créer cette demande ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Annuler'
      }).then((result: any) => {
        if (result.isConfirmed) {
          if (this.isEditMode && this.demandeId) {
            this.mutationService.updateDemandeMutation(this.demandeId, demande).subscribe({
              next: () => {
                Swal.default.fire('Succès', 'Demande de mutation modifiée', 'success');
                this.router.navigate(['/demandes/mutation']);
              },
              error: () => {
                Swal.default.fire('Erreur', 'Erreur lors de la modification.', 'error');
                this.loading = false;
              }
            });
          } else {
            this.mutationService.createDemandeMutation(demande).subscribe({
              next: () => {
                Swal.default.fire('Succès', 'Demande de mutation créée', 'success');
                this.router.navigate(['/demandes/mutation']);
              },
              error: () => {
                Swal.default.fire('Erreur', 'Erreur lors de la création.', 'error');
                this.loading = false;
              }
            });
          }
        } else {
          this.loading = false;
        }
      });
    });
  }
}
