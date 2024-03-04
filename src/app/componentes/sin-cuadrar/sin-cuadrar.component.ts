import { Component, OnInit } from '@angular/core';
import { control } from 'src/app/modelos/control';
import { gasolinera } from 'src/app/modelos/gasolinera';
import { sector } from 'src/app/modelos/sector';
import { ubicacion } from 'src/app/modelos/ubicacion_sector';
import { DashService } from 'src/app/servicios/dash.service';
import { ReporteService } from 'src/app/servicios/reporte.service';

@Component({
  selector: 'app-sin-cuadrar',
  templateUrl: './sin-cuadrar.component.html',
  styleUrls: ['./sin-cuadrar.component.css']
})
export class SinCuadrarComponent  implements OnInit{
controles:Array<control> = []
gasolineras:Array<gasolinera> = []
sectores:Array<sector> = []
ubicaciones:Array<ubicacion> = []
constructor(private servicio: ReporteService, private dash: DashService){

}


  ngOnInit(): void {


    this.getcontrolSinCuadre();
    this.getGasolinerasAll();
    this.getUbicacionesAll();
    this.getSectores();
   
    }


  getcontrolSinCuadre() {
    this.servicio.getReporteSinCuadre().subscribe((listado) => {
      this.controles = listado;
    });
  }


  obtenerNombreSector(idSector: number): { nombreSector: string, nombreUbicacion: string } {
    const resultado = {
      nombreSector: 'Sector Desconocido',
      nombreUbicacion: 'Ubicación Desconocida'
    };
  
    const sector = this.sectores.find((g) => g.id_sector === idSector);
    if (sector) {
      const ubicacion = this.ubicaciones.find((u) => u.id_ubicacion === sector.id_ubicacion);
       
      resultado.nombreSector = sector.nombre_sec;
      resultado.nombreUbicacion = ubicacion ? ubicacion.nombre_ubicacion : 'Ubicación Desconocida';
    }
    return resultado;
  }
  

  obtenerNombreGS(idGasolinera: number): string {
    const sector = this.gasolineras.find(
      (g) => g.id_gasolinera === idGasolinera
    );
    return sector ? sector.descripcion : 'Sector Desconocida';
  }



  getSectores() {
    this.dash.getSectores().subscribe((obj) => {
      this.sectores = obj;
    });
  }

  getGasolinerasAll() {
    this.dash.getGasolineras().subscribe((listado) => {
      this.gasolineras = listado;
    });
  }

  getUbicacionesAll() {
    this.dash.getUbicaciones().subscribe((listado) => {
      this.ubicaciones = listado;
    });
  }
}
