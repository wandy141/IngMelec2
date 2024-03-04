import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { combustible } from 'src/app/modelos/combustible';
import { gasolinera } from 'src/app/modelos/gasolinera';
import { sector } from 'src/app/modelos/sector';
import { ubicacion } from 'src/app/modelos/ubicacion_sector';
import { ControlesService } from 'src/app/servicios/controles.service';
import { DashService } from 'src/app/servicios/dash.service';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  rol: any;
  combustibles: Array<combustible> = [];
  sectores: Array<sector> = [];
  id_combustible: number = 0;
  id_sector: number = 0;
  id_gasolinera: number = 0;
  descripcion: string = '';
  descripcion_gasolinera: string = '';
  precio: number = 0;
  msgViolacion: boolean = false;
  msgGuardado: boolean = false;
  nombre_sec: string = '';
  totalMensual: any = [];
  totalMensualGS: any = [];
  mes: number = 1;
  mesGS: number = 1;
  nombre_ubicacion: string = '';
  id_ubicacion: number = 0;
  gasolineras: Array<any> = [];
  ubicaciones: Array<any> = [];
  msgEliminado: boolean = false;
  nombreMes: string = '';
  nombreMesGS: string = '';
  vista1:boolean = true;
  vista2:boolean = false;
  nombreVista:string = '';
  constructor(
    private servicio: DashService,
    private control: ControlesService
  ) {}




  ngOnInit(): void {
    var fechaActual = new Date();
    this.mes = fechaActual.getMonth() + 1;
    this.mesGS = fechaActual.getMonth() + 1;

    this.getCombustibles();
    this.getSectores();
    this.rol = this.control.obtenerRol();

    this.panelDash();
    this.panelDashGS();
    this.getGasolinerasAll();
    this.getUbicacionesAll();
    this.toggleVistas();

  }

  toggleVistas() {
    this.vista1 = !this.vista1;
    this.vista2 = !this.vista2;
if(this.vista1){
this.nombreVista = 'Gasolineras'
}else{
  this.nombreVista = 'Sectores'
}

  }

  meses = [
    { mes: 'Enero', id_mes: 1 },
    { mes: 'Febrero', id_mes: 2 },
    { mes: 'Marzo', id_mes: 3 },
    { mes: 'Abril', id_mes: 4 },
    { mes: 'Mayo', id_mes: 5 },
    { mes: 'Junio', id_mes: 6 },
    { mes: 'Julio', id_mes: 7 },
    { mes: 'Agosto', id_mes: 8 },
    { mes: 'Septiembre', id_mes: 9 },
    { mes: 'Octubre', id_mes: 10 },
    { mes: 'Noviembre', id_mes: 11 },
    { mes: 'Diciembre', id_mes: 12 },
  ];

  getCombustibles() {
    this.control.getCombustibles().subscribe((obj) => {
      this.combustibles = obj;
    });
  }

  getSectores() {
    this.servicio.getSectores().subscribe((obj) => {
      this.sectores = obj;
    });
  }

  panelDash() {
    this.mes = Number(this.mes);

    switch (this.mes) {
      case 1:
        this.nombreMes = 'Enero';
        break;
      case 2:
        this.nombreMes = 'Febrero';
        break;
      case 3:
        this.nombreMes = 'Marzo';
        break;
      case 4:
        this.nombreMes = 'Abril';
        break;
      case 5:
        this.nombreMes = 'Mayo';
        break;
      case 6:
        this.nombreMes = 'Junio';
        break;
      case 7:
        this.nombreMes = 'Julio';
        break;
      case 8:
        this.nombreMes = 'Agosto';
        break;
      case 9:
        this.nombreMes = 'Septiembre';
        break;
      case 10:
        this.nombreMes = 'Octubre';
        break;
      case 11:
        this.nombreMes = 'Noviembre';
        break;
      case 12:
        this.nombreMes = 'Diciembre';
        break;
      default:
        this.nombreMes = 'No se encontraron resultados';
    }

    this.servicio.panelDash(this.mes).subscribe(
      (data) => {
        this.totalMensual = data;
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  panelDashGS() {
    this.mesGS = Number(this.mesGS);

    switch (this.mesGS) {
      case 1:
        this.nombreMesGS = 'Enero';
        break;
      case 2:
        this.nombreMesGS = 'Febrero';
        break;
      case 3:
        this.nombreMesGS = 'Marzo';
        break;
      case 4:
        this.nombreMesGS = 'Abril';
        break;
      case 5:
        this.nombreMesGS = 'Mayo';
        break;
      case 6:
        this.nombreMesGS = 'Junio';
        break;
      case 7:
        this.nombreMesGS = 'Julio';
        break;
      case 8:
        this.nombreMesGS = 'Agosto';
        break;
      case 9:
        this.nombreMesGS = 'Septiembre';
        break;
      case 10:
        this.nombreMesGS = 'Octubre';
        break;
      case 11:
        this.nombreMesGS = 'Noviembre';
        break;
      case 12:
        this.nombreMesGS = 'Diciembre';
        break;
      default:
        this.nombreMesGS = 'No se encontraron resultados';
    }

    this.servicio.panelDashGS(this.mesGS).subscribe(
      (data) => {
        this.totalMensualGS = data;
        console.log(data);
        
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  insertarSector() {
    let sectorTemp: sector = new sector();
    sectorTemp.id_sector = this.id_sector;
    sectorTemp.nombre_sec = this.nombre_sec;
    sectorTemp.id_ubicacion = this.id_ubicacion;

    if (this.nombre_sec == '') {
      this.msgViolacion = true;
      setTimeout(() => {
        this.msgViolacion = false;
      }, 3000);
      return;
    }

    if (this.id_ubicacion == 0) {
      this.msgViolacion = true;
      setTimeout(() => {
        this.msgViolacion = false;
      }, 3000);
      return;
    }

    this.servicio.insertarSector(sectorTemp).subscribe((resultado: boolean) => {
      if (resultado) {
        this.msgGuardado = true;
        this.limpiar();
        setTimeout(() => {
          this.msgGuardado = false;
        }, 3000);
      }
      this.getSectores();
      this.panelDash();
    });
  }

  seleccionarComb(obj: combustible) {
    this.id_combustible = obj.id_combustible;
    this.descripcion = obj.descripcion;
    this.precio = obj.precio_galon;
  }

  seleccionarSector(obj: sector) {
    this.id_sector = obj.id_sector;
    this.nombre_sec = obj.nombre_sec;
    this.id_ubicacion = obj.id_ubicacion;
  }

  seleccionarGasolinera(obj: any) {
    this.id_gasolinera = obj.id_gasolinera;
    this.descripcion_gasolinera = obj.descripcion;
    this.id_ubicacion = obj.id_ubicacion;
  }

  seleccionarUbicacion(obj: ubicacion) {
    this.id_ubicacion = obj.id_ubicacion;
    this.nombre_ubicacion = obj.nombre_ubicacion;
  }

  insertComb() {
    let combTemp: combustible = new combustible();
    combTemp.id_combustible = this.id_combustible;
    combTemp.descripcion = this.descripcion;
    combTemp.precio_galon = this.precio;

    if (this.descripcion == '') {
      this.msgViolacion = true;
      setTimeout(() => {
        this.msgViolacion = false;
      }, 3000);
      return;
    }

    if (this.precio <= 0 || this.precio == undefined) {
      this.msgViolacion = true;
      setTimeout(() => {
        this.msgViolacion = false;
      }, 3000);
      return;
    }

    this.servicio
      .insertCombustible(combTemp)
      .subscribe((resultado: boolean) => {
        if (resultado) {
          this.msgGuardado = true;
          this.limpiar();
          setTimeout(() => {
            this.msgGuardado = false;
          }, 3000);
        }
        this.getCombustibles();
      });
  }

  limpiar() {
    this.id_combustible = 0;
    this.descripcion = '';
    this.precio = 0;
  }

  limpiaSector() {
    this.id_sector = 0;
    this.nombre_sec = '';
    this.id_ubicacion = 0;
  }

  limpiaGasolinera() {
    this.id_gasolinera = 0;
    this.id_ubicacion = 0;
    this.descripcion_gasolinera = '';
  }

  limpiarUbicacion() {
    this.id_gasolinera = 0;
    this.nombre_ubicacion = '';
  }

  eliminarCombustible(id_combustible: number) {
    this.servicio.eliminarCombustible(id_combustible).subscribe(
      (respuesta) => {
        this.getCombustibles();
        this.limpiar();
        if (respuesta && respuesta.mensaje === 1) {
          this.msgEliminado = true;
          setTimeout(() => {
            this.msgEliminado = false;
          }, 3000);
        }
      },
      (error) => {
        console.error('Error al eliminar el recurso', error);
      }
    );
  }

  getGasolinerasAll() {
    this.servicio.getGasolineras().subscribe((listado) => {
      this.gasolineras = listado;
    });
  }

  getUbicacionesAll() {
    this.servicio.getUbicaciones().subscribe((listado) => {
      this.ubicaciones = listado;
    });
  }

  insertGasolinera() {
    let combTemp: gasolinera = new gasolinera();
    combTemp.id_gasolinera = this.id_gasolinera;
    combTemp.descripcion = this.descripcion_gasolinera;
    combTemp.id_ubicacion = this.id_ubicacion;

    if (this.descripcion_gasolinera == '') {
      this.msgViolacion = true;
      setTimeout(() => {
        this.msgViolacion = false;
      }, 3000);
      return;
    }

    if (this.id_ubicacion == 0) {
      this.msgViolacion = true;
      setTimeout(() => {
        this.msgViolacion = false;
      }, 3000);
      return;
    }

    if (this.id_gasolinera == undefined) {
      this.msgViolacion = true;
      setTimeout(() => {
        this.msgViolacion = false;
      }, 3000);
      return;
    }

    this.servicio
      .insertarGasolinera(combTemp)
      .subscribe((resultado: boolean) => {
        if (resultado) {
          this.msgGuardado = true;
          this.limpiar();
          setTimeout(() => {
            this.msgGuardado = false;
          }, 3000);
        }
        this.getGasolinerasAll();
      });
  }

  insertUbicacion() {
    let combTemp: ubicacion = new ubicacion();
    combTemp.id_ubicacion = this.id_ubicacion;
    combTemp.nombre_ubicacion = this.nombre_ubicacion;

    if (this.id_ubicacion == undefined) {
      this.msgViolacion = true;
      setTimeout(() => {
        this.msgViolacion = false;
      }, 3000);
      return;
    }

    if (this.nombre_ubicacion == '') {
      this.msgViolacion = true;
      setTimeout(() => {
        this.msgViolacion = false;
      }, 3000);
      return;
    }

    this.servicio
      .insertarUbicacion(combTemp)
      .subscribe((resultado: boolean) => {
        if (resultado) {
          this.msgGuardado = true;
          this.limpiar();
          setTimeout(() => {
            this.msgGuardado = false;
          }, 3000);
        }
        this.getUbicacionesAll();
      });
  }
}
