import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from 'src/app/services/demandes/demandes/demande.service'; // Adjust path if needed
import { Demande, StatutDemande } from 'src/app/models/demande';  // Adjust path if needed
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-demande',
  templateUrl: './edit-demande.component.html',
  styleUrls: ['./edit-demande.component.css']
})
export class EditDemandeComponent implements OnInit {
  demandeForm: FormGroup;
  demande: Demande | null = null;
  demandeId: number;
  statuts = Object.values(StatutDemande); // Get possible statuses
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private demandeService: DemandeService
  ) {
    this.demandeForm = this.fb.group({
      statut: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.demandeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.demandeId) {
      this.loadDemande();
    }
  }

  loadDemande(): void {
    this.loading = true;
    this.demandeService.getDemandeById(this.demandeId).subscribe({
      next: (data) => {
        this.demande = data;
        this.demandeForm.patchValue({ statut: data.statut });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de la demande.';
        this.loading = false;
        console.error(err);
        Swal.fire('Erreur', this.error, 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.demandeForm.invalid) {
      return;
    }

    this.loading = true;
    const newStatus = this.demandeForm.value.statut;

    this.demandeService.updateDemande(this.demandeId, newStatus).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Succès !',
          text: 'Statut de la demande mis à jour avec succès.',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/demandes']); // Redirect to the list
        });
      },
      error: (err) => {
        this.error = 'Erreur lors de la mise à jour du statut.';
        this.loading = false;
        console.error(err);
        Swal.fire('Erreur', this.error, 'error');
      }
    });
  }
}
