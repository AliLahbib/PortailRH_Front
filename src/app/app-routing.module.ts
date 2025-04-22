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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: ListUserComponent },
  { path: 'users/edit', component: EditUserComponent },
  { path: 'users/edit/:id', component: EditUserComponent },
  { path: 'demandes', component: ListDemandesComponent },
  { path: 'demandes/add', component: AddDemandesComponent },
  {
    path: 'departements',
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
