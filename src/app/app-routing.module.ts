// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { HomeComponent } from './components/home/home.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: ListUserComponent },
  { path: 'users/edit', component: EditUserComponent },
  { path: 'users/edit/:id', component: EditUserComponent },


  { path: '**', redirectTo: '' }, // Catch-all (404)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
