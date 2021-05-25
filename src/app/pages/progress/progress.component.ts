import { Component} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent  {

  valorProgress1:number=0;
  valorProgress2:number=0;

  constructor() { }

  get getValorProgress1(){
    return `${this.valorProgress1}%`
  }

  get getValorProgress2(){
    return `${this.valorProgress2}%`
  }
}
