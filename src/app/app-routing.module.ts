// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { HomeComponent } from './components/home/home.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { ListDemandesComponent } from './components/demandes/demandes/list-demandes/list-demandes.component';
import { AddDemandesComponent } from './components/demandes/demandes/add-demandes/add-demandes.component';
import { ListDepartementsComponent } from './components/departements/list-departements/list-departements.component';
import { EditDepartementComponent } from './components/departements/edit-departement/edit-departement.component';
import { EditDemandeComponent } from './components/demandes/demandes/edit-demande/edit-demande.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ChangePasswordComponent } from './components/users/change-password/change-password.component';
import { AuthGuard } from './guards/auth.guard';
import { EditDemandeAutorisationComponent } from './components/demandes/autorisation/edit-demande-autorisation/edit-demande-autorisation.component';
import { ListDemandeAutorisationComponent } from './components/demandes/autorisation/list-demande-autorisation/list-demande-autorisation.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { ListDemandeCongeComponent } from './components/demandes/conge/list-demande-conge/list-demande-conge.component';
import { EditDemandeCongeComponent } from './components/demandes/conge/edit-demande-conge/edit-demande-conge.component';
import { ListDemandeFormationComponent } from './components/demandes/formation/list-demande-formation/list-demande-formation.component';
import { EditDemandeFormationComponent } from './components/demandes/formation/edit-demande-formation/edit-demande-formation.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: ListUserComponent, canActivate: [AuthGuard] },
  { path: 'users/create', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'demandes', component: ListDemandesComponent, canActivate: [AuthGuard] },
  { path: 'demandes/add', component: AddDemandesComponent, canActivate: [AuthGuard] },
  { path: 'demandes/edit/:id', component: EditDemandeComponent, canActivate: [AuthGuard] },
  { path: 'demandes/autorisation', component: ListDemandeAutorisationComponent },
  { path: 'demandes/autorisation/edit/:id', component: EditDemandeAutorisationComponent },
  { path: 'demandes/autorisation/create', component: EditDemandeAutorisationComponent },
  { path: 'demandes/conge', component: ListDemandeCongeComponent, canActivate: [AuthGuard] },
  { path: 'demandes/conge/edit/:id', component: EditDemandeCongeComponent, canActivate: [AuthGuard] },
  { path: 'demandes/conge/create', component: EditDemandeCongeComponent, canActivate: [AuthGuard] },
  { path: 'demandes/formation', component: ListDemandeFormationComponent, canActivate: [AuthGuard] },
  { path: 'demandes/formation/edit/:id', component: EditDemandeFormationComponent, canActivate: [AuthGuard] },
  { path: 'demandes/formation/create', component: EditDemandeFormationComponent, canActivate: [AuthGuard] },

  {
    path: 'departements',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListDepartementsComponent },
      { path: 'edit/new', component: EditDepartementComponent },
      { path: 'edit/:id', component: EditDepartementComponent }
    ]
  },
  { path: '**', redirectTo: '' }, // Catch-all (404)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
