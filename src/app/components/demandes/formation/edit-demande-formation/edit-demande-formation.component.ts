import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/services/demandes/formation/formation.service';
import { DemandeFormation } from 'src/app/models/demande-formation';

@Component({
  selector: 'app-edit-demande-formation',
  templateUrl: './edit-demande-formation.component.html',
  styleUrls: ['./edit-demande-formation.component.css']
})
export class EditDemandeFormationComponent implements OnInit {
  demandeForm: FormGroup;
  isEditMode = false;
  demandeId?: number;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private formationService: FormationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.demandeForm = this.fb.group({
      nomFormation: ['', Validators.required],
      organisme: ['', Validators.required],
      duree: ['', Validators.required],
      objectif: ['', Validators.required],
      commentaire: [''],
      justificatifURL: ['']
    });
  }

  ngOnInit(): void {
    this.demandeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.demandeId) {
      this.isEditMode = true;
      this.loading = true;
      this.formationService.getDemandeFormationById(this.demandeId).subscribe({
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
    const demande: DemandeFormation = this.demandeForm.value;
    if (this.isEditMode && this.demandeId) {
      this.formationService.updateDemandeFormation(this.demandeId, demande).subscribe({
        next: () => this.router.navigate(['/demandes/formation']),
        error: () => {
          this.errorMsg = 'Erreur lors de la modification.';
          this.loading = false;
        }
      });
    } else {
      this.formationService.createDemandeFormation(demande).subscribe({
        next: () => this.router.navigate(['/demandes/formation']),
        error: () => {
          this.errorMsg = 'Erreur lors de la création.';
          this.loading = false;
        }
      });
    }
  }
}
