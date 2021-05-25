import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any = [
    {
      titulo:'Principal',
      icono:'mdi mdi-gauge',
      submenu: [
        {titulo:'HOME', url:'/'},
        {titulo:'ProgresBar', url:'progress'},
        {titulo:'Graficas', url:'grafica1'},
        {titulo:'Promesas', url:'promesas'},
        {titulo:'RXJS', url:'rxjs'},
      ]
    }
  ];
  constructor() { }
}
