import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervaloSubcribe:Subscription;

  constructor() { }

  ngOnDestroy(): void {
    this.intervaloSubcribe.unsubscribe();
  }

  ngOnInit(): void {
   this.intervaloSubcribe=  this.retornaIntervalo().subscribe( valor => console.log( valor ) )
  }

  retornaIntervalo(){
    return interval(200)
           .pipe( 
             map( valor => valor+1),
             filter(valor => valor%2==0),
             //take(10)
           );
  }
}
