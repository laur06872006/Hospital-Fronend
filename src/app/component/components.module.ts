import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//Componentes
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficaDonaComponent,
  ],
  exports:[
    IncrementadorComponent,
    GraficaDonaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule
  ],
  providers: []
})
export class ComponentsModule { }