import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/shared/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    SidebarComponent,
    HomeComponent,
    EditUserComponent,
    NavbarComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
