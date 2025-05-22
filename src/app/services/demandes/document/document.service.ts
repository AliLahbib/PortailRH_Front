import { Injectable } from '@angular/core';
import { DemandeDocument } from 'src/app/models/demande-document';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
private apiUrl = `${environment.apiUrl}/demandes-document`;

  constructor(private http: HttpClient,private authService:AuthService) { }

  getAllDemandesMutation(): Observable<DemandeDocument[]> {
    return this.http.get<DemandeDocument[]>(this.apiUrl);
  }

  getDemandeDocumentById(id: number): Observable<DemandeDocument> {
    return this.http.get<DemandeDocument>(`${this.apiUrl}/${id}`);
  }

  getDemandesMutationByUtilisateur(utilisateurId: number): Observable<DemandeDocument[]> {
    return this.http.get<DemandeDocument[]>(`${this.apiUrl}/utilisateur/${utilisateurId}`);
  }

  createDemandeDocument(data: any): Observable<DemandeDocument> {
    data = { ...data, "utilisateurId": this.authService.getCurentUser().id };
    console.log("Data to be sent:", data);
    return this.http.post<DemandeDocument>(this.apiUrl, data);
  }

  updateDemandeDocument(id: number, data: any): Observable<DemandeDocument> {
    return this.http.put<DemandeDocument>(`${this.apiUrl}/${id}`, data);
  }

  deleteDemandeDocument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
