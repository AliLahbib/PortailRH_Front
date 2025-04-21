import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit {
  constructor(
    private router: Router
  ) { }



  ngOnInit(): void {
    $('#sidebarToggle').on('click', function () {
      $('#accordionSidebar').toggleClass('toggled');  // Ajoute ou enlève la classe 'toggled' au sidebar
      $('body').toggleClass('sidebar-toggled'); // Optionnel, pour gérer le décalage du contenu principal
    });
  }

  

}
