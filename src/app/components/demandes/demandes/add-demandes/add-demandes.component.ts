import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandeService } from '../../../../services/demandes/demandes/demande.service';
import { Demande } from '../../../../models/demande';

@Component({
  selector: 'app-add-demandes',
  templateUrl: './add-demandes.component.html',
  styleUrls: ['./add-demandes.component.css']
})
export class AddDemandesComponent implements OnInit {
  demandeForm: FormGroup;
  typesDemande = [
    'CONGE',

  ];

  constructor(
    private fb: FormBuilder,
    private demandeService: DemandeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.demandeForm = this.fb.group({
      typeDemande: ['', Validators.required],
      commentaire: ['', Validators.required],
      justificatifURL: ['']
    });
  }

  onSubmit(): void {
    if (this.demandeForm.valid) {
      const nouvelleDemande: Demande = {
        ...this.demandeForm.value,
      };

      this.demandeService.createDemande(nouvelleDemande).subscribe(
        (response) => {
          console.log('Demande créée avec succès:', response);
          this.router.navigate(['/demandes']);
        },
        (error) => {
          console.error('Erreur lors de la création de la demande:', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/demandes']);
  }
}
