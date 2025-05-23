import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { ListDemandesComponent } from './components/demandes/demandes/list-demandes/list-demandes.component';
import { AddDemandesComponent } from './components/demandes/demandes/add-demandes/add-demandes.component';
import { ListDepartementsComponent } from './components/departements/list-departements/list-departements.component';
import { EditDepartementComponent } from './components/departements/edit-departement/edit-departement.component';
import { EditDemandeComponent } from './components/demandes/demandes/edit-demande/edit-demande.component';
import { LoginComponent } from './components/auth/login/login.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ChangePasswordComponent } from './components/users/change-password/change-password.component';
import { EditDemandeAutorisationComponent } from './components/demandes/autorisation/edit-demande-autorisation/edit-demande-autorisation.component';
import { ListDemandeAutorisationComponent } from './components/demandes/autorisation/list-demande-autorisation/list-demande-autorisation.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { EditDemandeCongeComponent } from './components/demandes/conge/edit-demande-conge/edit-demande-conge.component';
import { ListDemandeCongeComponent } from './components/demandes/conge/list-demande-conge/list-demande-conge.component';
import { ListDemandeFormationComponent } from './components/demandes/formation/list-demande-formation/list-demande-formation.component';
import { EditDemandeFormationComponent } from './components/demandes/formation/edit-demande-formation/edit-demande-formation.component';
import { EditDemandeMutationComponent } from './components/demandes/mutation/edit-demande-mutation/edit-demande-mutation.component';
import { ListDemandeMutationComponent } from './components/demandes/mutation/list-demande-mutation/list-demande-mutation.component';
import { EditDemandeDocumentComponent } from './components/demandes/document/edit-demande-document/edit-demande-document.component';
import { ListDemandeDocumentComponent } from './components/demandes/document/list-demande-document/list-demande-document.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    SidebarComponent,
    HomeComponent,
    EditUserComponent,
    ListDemandesComponent,
    AddDemandesComponent,
    ListDepartementsComponent,
    EditDepartementComponent,
    EditDemandeComponent,
    LoginComponent,
    ChangePasswordComponent,
    EditDemandeAutorisationComponent,
    ListDemandeAutorisationComponent,
    CreateUserComponent,
    EditDemandeCongeComponent,
    ListDemandeCongeComponent,
    ListDemandeFormationComponent,
    EditDemandeFormationComponent,
    EditDemandeMutationComponent,
    ListDemandeMutationComponent,
    EditDemandeDocumentComponent,
    ListDemandeDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
