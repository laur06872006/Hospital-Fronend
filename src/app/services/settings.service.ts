import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTema = document.querySelector('#theme');

  constructor() {

    // Si existe un tema en el localStore 
   const colorTema=localStorage.getItem('tema') || './assets/css/colors/blue-dark.css ';
    // Carga el tema
    this.linkTema.setAttribute('href',colorTema);
  }


  cambiarTema(tema:string){
     // Cambia el Tema seleccionado y lo alamcena en el localStore
     const URL = `./assets/css/colors/${ tema }.css`
     this.linkTema.setAttribute('href',URL);
     localStorage.setItem('tema',URL);
     // Marco el Tema seleccionado
     this.marcarTema()
  }

  marcarTema(){

    // Tomo todos los enlaces <a> que tiene la clase ".selector"
    const  linktemas= document.querySelectorAll('.selector');

    // ELimino la (Marca) clase 'working de cada elemento (tema)'
    linktemas.forEach(elem => elem.classList.remove('working'));

     // Coloco la (Marca) clase 'working al elemento del tema elegido'
    linktemas.forEach(elem => {
      const temaElemento = elem.getAttribute('data-theme');
      const URLtemaElemento = `./assets/css/colors/${ temaElemento }.css`;
      const URLtemaAplicacion = this.linkTema.getAttribute('href');
      if (URLtemaElemento===URLtemaAplicacion)
        elem.classList.add('working');
    });
  }
}
