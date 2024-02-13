import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SecundarioModule } from './secundario/secundario.module';
import { LoginComponent } from './componentes/login/login.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { ReporteGasolineraComponent } from './componentes/reporte-gasolinera/reporte-gasolinera.component';
import { CuadreComponent } from './componentes/cuadre/cuadre.component';


@NgModule({
  declarations: [
    AppComponent,
LoginComponent,
EditarComponent,
ReporteGasolineraComponent,
CuadreComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SecundarioModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
