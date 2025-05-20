import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserService } from './user/user.service';
import { Utilisateur } from '../models/Utilisateur';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private currentUserInformationSubject: BehaviorSubject<Utilisateur | null> = new BehaviorSubject<Utilisateur | null>(this.getCurentUser());
  public currentUserInformation: Observable<Utilisateur | null> = this.currentUserInformationSubject.asObservable();


  constructor(private http: HttpClient, private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  getCurentUser() {
    const user = localStorage.getItem('User');
    return user ? JSON.parse(user) : null;
  }




  login(matricule: string, password: string) {
    console.log("debug login ", { matricule, password })
    return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { matricule, password })
      .pipe(map(user => {
        // stocker les détails de l'utilisateur et le token JWT dans le localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userService.getUserByEmail(user.email).subscribe((utilisateur: Utilisateur) => {
          localStorage.setItem('User', JSON.stringify(utilisateur));
          this.currentUserSubject.next(utilisateur);
          this.currentUserInformationSubject.next(utilisateur); // MAJ du nouveau subject
          return user;

        });
        // return user;


      }));
  }

  logout() {
    // supprimer l'utilisateur du localStorage
    localStorage.removeItem('User');
    localStorage.removeItem('currentUser');
    
    this.currentUserSubject.next(null);
    this.currentUserInformationSubject.next(null); // MAJ du nouveau subject
  }

  isLoggedIn(): boolean {
    return this.getCurentUser() !== null;
  }
}