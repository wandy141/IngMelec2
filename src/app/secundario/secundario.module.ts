import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecundarioComponent } from './secundario.component';
import { ControlComponent } from '../componentes/control/control.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReportesComponent } from '../componentes/reportes/reportes.component';
import { AccesoGuard } from '../servicios/acceso.guard';
import { LoginComponent } from '../componentes/login/login.component';
import { DashBoardComponent } from '../componentes/dash-board/dash-board.component';
import { NoReporteComponent } from '../componentes/no-reporte/no-reporte.component';
import { EditarRegistroComponent } from '../componentes/editar-registro/editar-registro.component';
import { UsuarioComponent } from '../componentes/usuario/usuario.component';
import { VehiculoComponent } from '../componentes/vehiculo/vehiculo.component';
import { EmpleadoComponent } from '../componentes/empleado/empleado.component';
import { EditarComponent } from '../componentes/editar/editar.component';
import { ReporteGasolineraComponent } from '../componentes/reporte-gasolinera/reporte-gasolinera.component';
import { CuadreComponent } from '../componentes/cuadre/cuadre.component';
import { SinCuadrarComponent } from '../componentes/sin-cuadrar/sin-cuadrar.component';




@NgModule({
  declarations: [
    SecundarioComponent,
    ControlComponent,
    ReportesComponent,
    DashBoardComponent,
    NoReporteComponent,
    EditarRegistroComponent,
    UsuarioComponent,
    VehiculoComponent,
    EmpleadoComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'side', component: SecundarioComponent , canActivate: [AccesoGuard],
      children: [
        { path: 'control', component: ControlComponent, canActivate: [AccesoGuard] } ,
        { path: 'reporte', component: ReportesComponent , canActivate: [AccesoGuard]},
        { path: 'noreporte', component: NoReporteComponent , canActivate: [AccesoGuard]},
        { path: 'dash', component: DashBoardComponent, canActivate: [AccesoGuard] },
        { path: 'usuario', component: UsuarioComponent, canActivate: [AccesoGuard] },
        { path: 'vehiculo', component: VehiculoComponent, canActivate: [AccesoGuard] },
        { path: 'empleado', component: EmpleadoComponent, canActivate: [AccesoGuard] },
        { path: 'editar', component: EditarComponent, canActivate: [AccesoGuard] },
        { path: 'reporteGS', component: ReporteGasolineraComponent, canActivate: [AccesoGuard] },
        { path: 'cuadre', component: CuadreComponent, canActivate: [AccesoGuard] },
        { path: 'sinCuadre', component: SinCuadrarComponent, canActivate: [AccesoGuard] },
      

      ],
    },
    { path: '**', component: LoginComponent},
    ]),
  ],
})
export class SecundarioModule { }
