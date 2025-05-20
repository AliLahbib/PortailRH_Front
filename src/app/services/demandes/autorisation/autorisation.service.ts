import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { DemandeAutorisation } from 'src/app/models/demande-autorisation';
import { Demande } from 'src/app/models/demande';
@Injectable({
  providedIn: 'root'
})
export class AutorisationService {
  private apiUrl = `${environment.apiUrl}/demandes-autorisation`;

  constructor(private http: HttpClient,private authService:AuthService) { }

  getDemandeAutorisation(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateDemandeAutorisation(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  createDemandeAutorisation(data: any): Observable<any> {
    data= {...data,"utilisateurId":this.authService.getCurentUser().id}
    console.log("debug for create ",data)
     let response =this.http.post(this.apiUrl, data);
     return response
  }

  deleteDemandeAutorisation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getDemandesByUtilisateur(utilisateurId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/utilisateur/${utilisateurId}`);
  }
}
