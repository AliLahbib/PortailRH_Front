import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../../../../services/demandes/demandes/demande.service';
import { Demande } from '../../../../models/demande';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-demandes',
  templateUrl: './list-demandes.component.html',
  styleUrls: ['./list-demandes.component.css']
})
export class ListDemandesComponent implements OnInit {
  demandes: Demande[] = [];
  filteredDemandes: Demande[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  selectedType: string = 'all';
  loading = false;
  error = '';
  minDate: string = '';
  maxDate: string = '';


  constructor(
    private demandeService: DemandeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    this.demandeService.getDemandes().subscribe(
      (data) => {
        this.demandes = data;
        console.log("debug demandes ", data)
        this.filterDemandes();
      },
      (error) => {
        this.error = 'Erreur lors du chargement des deamndes';

        console.error('Erreur lors du chargement des demandes:', error);
      }
    );
  }

  filterDemandes(): void {
    this.filteredDemandes = this.demandes.filter(demande => {
      const matchesSearch = demande.typeDemande.toLowerCase().includes(
        this.searchTerm.toLowerCase()) ||
        demande.commentaire.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        demande.statut.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (demande.utilisateur.prenom + ' ' + demande.utilisateur.nom).toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'all' || demande.statut === this.selectedStatus;
      const matchesType = this.selectedType === 'all' || demande.typeDemande === this.selectedType;
      let matchesDate = true;
      if (this.minDate) {
        matchesDate = matchesDate && (new Date(demande.dateCreation) >= new Date(this.minDate));
      }
      if (this.maxDate) {
        matchesDate = matchesDate && (new Date(demande.dateCreation) <= new Date(this.maxDate));
      }
      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }

  onSearch(): void {
    this.filterDemandes();
  }

  onStatusChange(): void {
    this.filterDemandes();
  }

  onTypeChange(): void {
    this.filterDemandes();
  }

  onDateChange(): void {
    this.filterDemandes();
  }

  get paginatedDemandes(): Demande[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDemandes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredDemandes.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  viewDemandeDetails(id: number): void {
    this.router.navigate(['/demandes', id]);
  }

  editDemande(id: number): void {
    this.router.navigate(['/demandes/edit', id]);
  }

  deleteDemande(id: number): void {
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
        this.demandeService.deleteDemande(id).subscribe({
          next: () => {
            Swal.fire(
              'Supprimé !',
              'L\'utilisateur a été supprimé avec succès.',
              'success'
            );
            this.loadDemandes();
          },
          error: (err) => {
            this.error = 'Erreur lors de la suppression de l\'utilisateur';
            this.loading = false;
            if (err.status == 409) {
              console.error('Erreur d\'intégrité :', err);
              Swal.fire(
                'Suppression impossible',
                'Cet utilisateur est référencé par des demandes',
                'error'
              );
            } else {
              Swal.fire(
                'Erreur !',
                'Une erreur est survenue lors de la suppression.',
                'error'
              );
            }
          }
        });
      }
    });


  }

  addDemande(): void {
    this.router.navigate(['/demandes/add']);
  }
}
