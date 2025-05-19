import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandeFormation } from 'src/app/models/demande-formation';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = environment.apiUrl + '/demandes-formation';

  constructor(private http: HttpClient,private authService:AuthService) { }

  getAllDemandesFormation(): Observable<DemandeFormation[]> {
    return this.http.get<DemandeFormation[]>(this.apiUrl);
  }

  getDemandeFormationById(id: number): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>(`${this.apiUrl}/${id}`);
  }

  createDemandeFormation(demande: DemandeFormation): Observable<DemandeFormation> {
   console.log("creation demande ",demande);
   let data={ ...demande,"utilisateurId":this.authService.getCurentUser().id}
    return this.http.post<DemandeFormation>(this.apiUrl, data);
  }

  updateDemandeFormation(id: number, demande: Partial<DemandeFormation>): Observable<DemandeFormation> {
   console.log("update demande ",demande);
    let data={ ...demande,"utilisateurId":this.authService.getCurentUser().id}
    return this.http.put<DemandeFormation>(`${this.apiUrl}/${id}`, data);
  }

  deleteDemandeFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDemandesFormationByUtilisateurId(utilisateurId: number): Observable<DemandeFormation[]> {
    return this.http.get<DemandeFormation[]>(`${this.apiUrl}/utilisateur/${utilisateurId}`);
  }
}
