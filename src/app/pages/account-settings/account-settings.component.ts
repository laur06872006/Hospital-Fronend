import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor( private sv_Service:SettingsService) { }

  ngOnInit(): void {
    // Marca el tema seleccionado por el usuraio
    this.sv_Service.marcarTema();
  }

  cambiarTema(tema:string){
    this.sv_Service.cambiarTema(tema);
  }
}
