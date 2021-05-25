import { Component } from '@angular/core';

import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuOpciones: any[] = [];


  constructor(private sv_sidebar: SidebarService,
    private usuarioService: UsuarioService) {
    this.menuOpciones = this.sv_sidebar.menu;
  }

  /////////////////////////
  logout() {
    this.usuarioService.logout();
  }

}
