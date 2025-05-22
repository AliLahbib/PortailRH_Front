import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DemandeMutation } from 'src/app/models/demande-mutation';
import { AuthService } from '../../../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class MutationService {
  private apiUrl = `${environment.apiUrl}/demandes-mutation`;

  constructor(private http: HttpClient,private authService:AuthService) { }

  getAllDemandesMutation(): Observable<DemandeMutation[]> {
    return this.http.get<DemandeMutation[]>(this.apiUrl);
  }

  getDemandeMutationById(id: number): Observable<DemandeMutation> {
    return this.http.get<DemandeMutation>(`${this.apiUrl}/${id}`);
  }

  getDemandesMutationByUtilisateur(utilisateurId: number): Observable<DemandeMutation[]> {
    return this.http.get<DemandeMutation[]>(`${this.apiUrl}/utilisateur/${utilisateurId}`);
  }

  createDemandeMutation(data: any): Observable<DemandeMutation> {
    data = { ...data, "utilisateurId": this.authService.getCurentUser().id };
    return this.http.post<DemandeMutation>(this.apiUrl, data);
  }

  updateDemandeMutation(id: number, data: any): Observable<DemandeMutation> {
    return this.http.put<DemandeMutation>(`${this.apiUrl}/${id}`, data);
  }

  deleteDemandeMutation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
