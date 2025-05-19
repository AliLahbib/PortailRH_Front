import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CongeService } from '../../../../services/demandes/conge/conge.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-demande-conge',
  templateUrl: './edit-demande-conge.component.html',
//   styleUrls: ['./edit-demande-conge.component.css']
})
export class EditDemandeCongeComponent implements OnInit {
  demandeForm: FormGroup;
  isEdit: boolean = false;
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private congeService: CongeService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.demandeForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      motif: ['', Validators.required],
      commentaire: [''],
      justificatifURL: [''],
        
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.congeService.getDemandeConge(this.id).subscribe(
        data => this.demandeForm.patchValue(data),
        error => this.toastr.error('Erreur lors du chargement de la demande')
      );
    }
  }

  saveDemande(): void {
    if (this.demandeForm.invalid) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    const utilisateurId = 1; // Remplacer par l'ID réel de l'utilisateur connecté si besoin
    const demande = { ...this.demandeForm.value, utilisateurId };
    if (this.isEdit && this.id) {
      this.congeService.updateDemandeConge(this.id, demande).subscribe(
        () => {
          this.toastr.success('Demande de congé mise à jour');
          this.router.navigate(['/demandes/conge']);
        },
        () => this.toastr.error('Erreur lors de la mise à jour')
      );
    } else {
      this.congeService.createDemandeConge(demande).subscribe(
        () => {
          this.toastr.success('Demande de congé créée');
          this.router.navigate(['/demandes/conge']);
        },
        () => this.toastr.error('Erreur lors de la création')
      );
    }
  }
}
