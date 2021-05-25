import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// Funcion global (./assets/js/custon.js) que ejecuta los script que inicia al estructura de la aplicacion
declare function inicializarEstructuraPagina();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private sv_settings:SettingsService) { }

  ngOnInit(): void {
    inicializarEstructuraPagina();
  }

}
