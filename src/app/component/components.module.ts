import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
//Componentes
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.components';



@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficaDonaComponent,
    ModalImagenComponent
  ],
  exports: [
    IncrementadorComponent,
    GraficaDonaComponent,
    ModalImagenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule
  ],
  providers: []
})
export class ComponentsModule { }