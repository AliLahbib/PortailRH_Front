import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Utilisateur } from '../../../models/Utilisateur';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUserInformation: Utilisateur | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log("debug is LoggedIn ", this.authService.isLoggedIn());
    this.authService.currentUserInformation.subscribe(userInfo => {
      this.currentUserInformation = userInfo;
    });
    $('#sidebarToggle').on('click', function () {
      $('#accordionSidebar').toggleClass('toggled'); 
      $('body').toggleClass('sidebar-toggled');
    });
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }

}
