import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Utilisateur } from '../../models/Utilisateur'; // Assure-toi que le chemin du modèle est correct

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8001/api/utilisateurs'; // Remplace par l'URL de ton API backend

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Erreur côté client:', error.error.message);
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      console.error(
        `Code d'erreur: ${error.status}, ` +
        `Message: ${error.error?.message || error.message}`
      );
      
    
    }
    
    return throwError(() => new Error(errorMessage));
  }

  getAllUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Récupérer un utilisateur par ID
  getUserById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  getUserByMatricule(matricule: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/matricule/${matricule}`)
      .pipe(catchError(this.handleError));
  }
  getUserByEmail(email: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/email/${email}`)
      .pipe(catchError(this.handleError));
  }

  // Créer un nouvel utilisateur
  createUser(userData: any): Observable<Utilisateur> {
    // Format the data according to the API requirements
    const formattedData = {
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      motDePasse: userData.motDePasse,
      role: userData.role,
      departement: userData.departementId ? { id: userData.departementId } : null
    };
    return this.http.post<Utilisateur>(this.apiUrl, formattedData)
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour un utilisateur
  updateUser(id: number, userData: any): Observable<Utilisateur> {
    console.log("debug updated ",userData)
    // Format the data according to the API requirements
    const formattedData = {
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      motDePasse: userData.motDePasse,
      role: userData.role,
      departement: userData.departement ? { id: userData.departement } : {id:null}
    };
    return this.http.put<Utilisateur>(`${this.apiUrl}/${id}`, formattedData)
      .pipe(catchError(this.handleError));
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      // .pipe(
      //   catchError((error: HttpErrorResponse) => {
      //     let errorMessage = 'Erreur lors de la suppression de l\'utilisateur';
      //     if (error.status == 409) {
      //       // Erreur d'intégrité (conflit)
      //       errorMessage = error.error || 'Impossible de supprimer l\'utilisateur car il est référencé de demandes.';
      //     }
      //     return throwError(() => new Error(errorMessage));
      //   })
      // );
  }

  changePassword(userId: number, newPassword: string): Observable<any> {
    return this.http.post(
      `http://localhost:8001/api/auth/change-password/${userId}`,
      { newPassword },
      { responseType: 'text' }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors du changement de mot de passe:', {
          status: error.status,
          statusText: error.statusText,
          error: error.error
        });
        return throwError(() => new Error(error.error || 'Erreur lors du changement de mot de passe'));
      })
    );
  }
}

