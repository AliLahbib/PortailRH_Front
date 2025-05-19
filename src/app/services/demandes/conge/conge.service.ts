import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private apiUrl = `${environment.apiUrl}/demandes-conge`;

  constructor(private http: HttpClient) { }

  getDemandeConge(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateDemandeConge(id: number, data: any): Observable<any> {
         data = { ...data, "utilisateurId": 1 };
        // data = { ...data, "id": id };
        console.log("Data to be update:", data);

    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  createDemandeConge(data: any): Observable<any> {
    console.log("Data to be sent:", data);
    data = { ...data, "utilisateurId": 1 };
    return this.http.post(this.apiUrl, data);
  }

  deleteDemandeConge(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getDemandesByUtilisateur(utilisateurId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/utilisateur/${utilisateurId}`);
  }
}
