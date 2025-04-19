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

  // Récupérer tous les utilisateurs
  getUsers(): Observable<Utilisateur[]> {
    let users : Observable<Utilisateur[]>=this.http.get<Utilisateur[]>(this.apiUrl);
    return users
  }

  // Récupérer un utilisateur par ID
  getUserById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouvel utilisateur
  createUser(user: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl, user);
  }

  // Mettre à jour un utilisateur
  updateUser(userId, user: Utilisateur): Observable<Utilisateur> {
    console.log("debug serveice user id ",userId)
    return this.http.put<Utilisateur>(`${this.apiUrl}/${userId}`, user);
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
