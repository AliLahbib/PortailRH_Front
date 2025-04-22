import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../../models/Utilisateur'; // Assure-toi que le chemin du modèle est correct

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8001/api/utilisateurs'; // Remplace par l'URL de ton API backend

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }

  // Récupérer un utilisateur par ID
  getUserById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
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
    return this.http.post<Utilisateur>(this.apiUrl, formattedData);
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
      departement: userData.departementId ? { id: userData.departementId } : {id:null}
    };
    return this.http.put<Utilisateur>(`${this.apiUrl}/${id}`, formattedData);
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
