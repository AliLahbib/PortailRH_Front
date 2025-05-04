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
        // Formatage de la date pour l'input de type date
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
    if (this.demandeForm.valid) {
      const formData = this.demandeForm.value;
      
      if (this.isEditMode) {
        this.autorisationService.updateDemandeAutorisation(this.demandeId, formData).subscribe(
          response => {
            this.toastr.success('Demande mise à jour avec succès');
            this.router.navigate(['/demandes/autorisation']);
          },
          error => {
            this.toastr.error('Erreur lors de la mise à jour de la demande');
          }
        );
      } else {
        this.autorisationService.createDemandeAutorisation(formData).subscribe(
          response => {
            this.toastr.success('Demande créée avec succès');
            this.router.navigate(['/demandes/autorisation']);
          },
          error => {
            this.toastr.error('Erreur lors de la création de la demande');
          }
        );
      }
    }
  }
}
