import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorisationService } from '../../../../services/demandes/autorisation/autorisation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-demande-autorisation',
  templateUrl: './edit-demande-autorisation.component.html',
  styleUrls: ['./edit-demande-autorisation.component.css']
})
export class EditDemandeAutorisationComponent implements OnInit {
  demandeForm: FormGroup;
  demandeId: number;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private autorisationService: AutorisationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.demandeForm = this.fb.group({
      dateAutorisation: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      raison: ['', Validators.required],
      commentaire: [''],
      justificatifURL: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.demandeId = +params['id'];
      this.isEditMode = !!this.demandeId;
      
      if (this.isEditMode) {
        this.loadDemande();
      }
    });
  }

  loadDemande(): void {
    this.autorisationService.getDemandeAutorisation(this.demandeId).subscribe(
      data => {
        const date = new Date(data.dateAutorisation);
        const formattedDate = this.formatDateForInput(date);
        
        this.demandeForm.patchValue({
          dateAutorisation: formattedDate,
          heureDebut: data.heureDebut,
          heureFin: data.heureFin,
          raison: data.raison,
          commentaire: data.commentaire,
          justificatifURL: data.justificatifURL
        });
      },
      error => {
        this.toastr.error('Erreur lors du chargement de la demande');
      }
    );
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.demandeForm.invalid) return;
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
            this.autorisationService.updateDemandeAutorisation(this.demandeId, this.demandeForm.value).subscribe(
              () => {
                Swal.default.fire('Succès', 'Demande d\'autorisation modifiée', 'success');
                this.router.navigate(['/demandes/autorisation']);
              },
              () => Swal.default.fire('Erreur', 'Erreur lors de la modification.', 'error')
            );
          } else {
            this.autorisationService.createDemandeAutorisation(this.demandeForm.value).subscribe(
              () => {
                Swal.default.fire('Succès', 'Demande d\'autorisation créée', 'success');
                this.router.navigate(['/demandes/autorisation']);
              },
              () => Swal.default.fire('Erreur', 'Erreur lors de la création.', 'error')
            );
          }
        }
      });
    });
  }
}
