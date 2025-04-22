import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from '../../../models/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:8001/api/demandes'; // URL de l'API backend

  constructor(private http: HttpClient) { }

  // Récupérer toutes les demandes
  getDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.apiUrl);
  }

  // Récupérer une demande par ID
  getDemandeById(id: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les demandes par ID utilisateur
  getDemandesByUtilisateurId(utilisateurId: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.apiUrl}/utilisateur/${utilisateurId}`);
  }

  // Récupérer les demandes en attente
  getDemandesEnAttente(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/en-attente`);
  }

  // Récupérer les demandes validées
  getDemandesValidees(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/validees`);
  }

  // Récupérer les demandes refusées
  getDemandesRefusees(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/refusees`);
  }

  // Créer une nouvelle demande
  createDemande(demande: any): Observable<Demande> {
    demande={ ...demande,"utilisateurId":1}
    console.log("debug demande ",demande)
    return this.http.post<Demande>(this.apiUrl+"/create", demande);
  }

  // Mettre à jour une demande
  updateDemande(id: number, demande: Demande): Observable<Demande> {
    return this.http.put<Demande>(`${this.apiUrl}/${id}`, demande);
  }

  // Supprimer une demande
  deleteDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
