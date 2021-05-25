import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: [
  ]
})
export class GraficaDonaComponent {
  // Doughnut
  @Input() titulo: String='Grafica';
  @Input() legenda: string[]=['A','B','C'];
  @Input() Data: MultiDataSet= [[10,20,30]];

  public colors:Color[] = [
    { backgroundColor:['#6857E6', '#009FEE','#F02059']}
  ];
  
  constructor() { }

}
