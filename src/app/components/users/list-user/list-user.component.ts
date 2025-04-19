import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UserService } from 'src/app/services/user/user.service'; 
declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, AfterViewInit {

  utilisateurs: Utilisateur[] = []; // Tableau pour stocker les utilisateurs

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers(); // Charger les utilisateurs lors de l'initialisation du composant
  }

  // Charger tous les utilisateurs via le service
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: Utilisateur[]) => {
        this.utilisateurs = data; // Assigner les données récupérées à la variable utilisateurs
        // Réinitialiser et mettre à jour DataTables après avoir chargé les utilisateurs
        this.updateDataTable();
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      }
    );
  }

  // Rediriger vers la page d'édition d'un utilisateur
  editUser(id: number): void {
    this.router.navigate(['/users/edit', id]); // Rediriger vers le composant UserEdit avec l'ID
  }

  // Supprimer un utilisateur
  deleteUser(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.loadUsers(); // Recharger les utilisateurs après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
      );
    }
  }

  ngAfterViewInit(): void {
    // Nous initialiserons DataTables une fois que les utilisateurs seront chargés.
  }

  // Mettre à jour DataTables après l'ajout, la suppression ou la modification des données
  updateDataTable(): void {
    setTimeout(() => {
      // Si DataTable est déjà initialisé, il faut le réinitialiser
      if ($.fn.dataTable.isDataTable('#dataTable')) {
        $('#dataTable').DataTable().clear().destroy(); // Effacer et détruire l'ancienne instance
      }

      // Initialisation de DataTable
      $('#dataTable').DataTable({
        paging: true,           // Activer la pagination
        searching: true,        // Activer la recherche
        ordering: true,         // Activer le tri
        info: true,             // Afficher le nombre d'éléments
        lengthChange: true      // Permet de changer le nombre d'éléments par page
      });
    }, 0);
  }
}
