import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../../../../services/demandes/demandes/demande.service';
import { Demande } from '../../../../models/demande';
import { Router } from '@angular/router';

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
        console.log("debug demandes ",data)
        this.filterDemandes();
      },
      (error) => {
        console.error('Erreur lors du chargement des demandes:', error);
      }
    );
  }

  filterDemandes(): void {
    this.filteredDemandes = this.demandes.filter(demande => {
      const matchesSearch = demande.typeDemande.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          demande.commentaire.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'all' || demande.statut === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  onSearch(): void {
    this.filterDemandes();
  }

  onStatusChange(): void {
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
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.demandeService.deleteDemande(id).subscribe(
        () => {
          this.demandes = this.demandes.filter(d => d.id !== id);
          this.filterDemandes();
        },
        (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      );
    }
  }

  addDemande(): void {
    this.router.navigate(['/demandes/add']);
  }
}
