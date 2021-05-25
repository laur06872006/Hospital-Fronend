import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  // Grafica 1
  tituloGrafica1="Ventas"
  etiquetaGrafica1:String[] = ['Aruzar', 'Arroz', 'Harina'];
  dataGrafica1:number[]= [350, 450, 100];
  
  constructor() { }

}
