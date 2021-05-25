import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  
  @Input('progresoValor') progreso:number=10;
  @Input() btnClass: string= "btn-primary";

  @Output() cambioProgress: EventEmitter<number>;

  constructor() {
    this.cambioProgress= new EventEmitter();
  }

  ngOnInit() {
    this.btnClass= `btn ${this.btnClass}`
  }

  cambiarValor(num:number){
   
    this.progreso+=num;  

    if (this.progreso<0)
      return this.progreso=0;
    
    if(this.progreso>100)
      return  this.progreso=100;
     
    this.cambioProgress.emit(this.progreso);
  }

}
