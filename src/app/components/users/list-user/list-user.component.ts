import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UserService } from 'src/app/services/user/user.service';
import { DepartementService } from '../../../services/departements/departement.service';
import { Departement } from '../../../models/departement';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, AfterViewInit {

  utilisateurs: Utilisateur[] = [];
  departements: Departement[] = [];
  selectedDepartementId: number | null = null;
  loading = false;
  error = '';

  constructor(
    private userService: UserService,
    private departementService: DepartementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartements();
    this.loadUsers();
  }

  loadDepartements(): void {
    this.departementService.getAllDepartements().subscribe({
      next: (data) => {
        this.departements = data;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des départements';
        console.error(err);
      }
    });
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        console.log("debug utilisateurs ",data)
        this.loading = false;
        this.initializeDataTable();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onDepartementChange(): void {
    if (this.selectedDepartementId) {
      const filteredUsers = this.utilisateurs.filter(user => 
        user.departement?.id == this.selectedDepartementId
      );
      this.updateDataTable(filteredUsers);
    } else {
      this.updateDataTable(this.utilisateurs);
    }
  }

  editUser(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }

  addUser(): void {
    this.router.navigate(['/users/edit']);
  }

  deleteUser(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.userService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire(
              'Supprimé !',
              'L\'utilisateur a été supprimé avec succès.',
              'success'
            );
            this.loadUsers();
          },
          error: (err) => {
            this.error = 'Erreur lors de la suppression de l\'utilisateur';
            this.loading = false;
            Swal.fire(
              'Erreur !',
              'Une erreur est survenue lors de la suppression.',
              'error'
            );
            console.error(err);
          }
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  initializeDataTable(): void {
    if ($.fn.dataTable.isDataTable('#dataTable')) {
      $('#dataTable').DataTable().destroy();
    }

    const table = $('#dataTable').DataTable({
      data: this.utilisateurs,
      columns: [
        { data: 'matricule' },
        { data: 'nom' },
        { data: 'prenom' },
        { data: 'email' },
        { data: 'role' },
        { 
          data: 'departement',
          render: function(data: any) {
            return data ? data.label : 'Non assigné';
          }
        },
        {
          data: 'id',
          render: (data: any) => {
            return `
              <button class="btn btn-sm btn-primary me-2 edit-btn" data-id="${data}">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger delete-btn" data-id="${data}">
                <i class="fas fa-trash"></i>
              </button>
            `;
          }
        }
      ],
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      lengthChange: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/French.json'
      }
    });

    // Handling click events for edit and delete buttons
    $('#dataTable').on('click', '.edit-btn', (e: any) => {
      const id = $(e.currentTarget).data('id');
      this.editUser(id);
    });

    $('#dataTable').on('click', '.delete-btn', (e: any) => {
      const id = $(e.currentTarget).data('id');
      this.deleteUser(id);
    });
  }

  updateDataTable(data: Utilisateur[]): void {
    const table = $('#dataTable').DataTable();
    table.clear();
    table.rows.add(data);
    table.draw();
  }
}
