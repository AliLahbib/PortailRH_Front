import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from '../../../services/departements/departement.service';
import { Departement } from 'src/app/models/departement';

@Component({
  selector: 'app-edit-departement',
  templateUrl: './edit-departement.component.html',
})
export class EditDepartementComponent implements OnInit {
  departementForm: FormGroup;
  isNew = true;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departementService: DepartementService
  ) {
    this.departementForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      label: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isNew = false;
      this.loadDepartement(Number(id));
    }
  }

  loadDepartement(id: number): void {
    this.loading = true;
    this.departementService.getDepartementById(id).subscribe({
      next: (departement) => {
        this.departementForm.patchValue(departement);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du département';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.departementForm.valid) {
      this.loading = true;
      const departement: Departement = this.departementForm.value;

      if (this.isNew) {
        this.departementService.createDepartement(departement).subscribe({
          next: () => {
            this.router.navigate(['/departements']);
          },
          error: (err) => {
            this.error = 'Erreur lors de la création du département';
            this.loading = false;
            console.error(err);
          }
        });
      } else {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.departementService.updateDepartement(id, departement).subscribe({
          next: () => {
            this.router.navigate(['/departements']);
          },
          error: (err) => {
            this.error = 'Erreur lors de la mise à jour du département';
            this.loading = false;
            console.error(err);
          }
        });
      }
    }
  }
} 