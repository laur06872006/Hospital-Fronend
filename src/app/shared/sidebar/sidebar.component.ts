import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public menuOpciones: any[] = [];
  public usuario: Usuario;

  constructor(private sv_sidebar: SidebarService,
    private usuarioService: UsuarioService) {

    this.usuario = this.usuarioService.usuarioLogeado;
    this.menuOpciones = this.sv_sidebar.menu;
  }

  /////////////////////////
  logout() {
    this.usuarioService.logout();
  }

}
