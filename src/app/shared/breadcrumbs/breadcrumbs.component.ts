import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public tituloPagina:string;
  public tituloSuscribe$: Subscription;

  constructor (private router: Router) { 
    this.tituloSuscribe$=this.getDataRutas().subscribe(({ titulo }) => {
            this.tituloPagina= titulo;
            document.title=`AppPrueba - ${ titulo }`;
    });
  }

  ngOnDestroy(): void {
    this.tituloSuscribe$.unsubscribe();
  }

  getDataRutas(){
    return this.router.events
            .pipe(
              filter(event => event instanceof ActivationEnd ),
              filter((event:ActivationEnd) => event.snapshot.firstChild === null),
              map((event:ActivationEnd) => event.snapshot.data),
            )
  }
}
