import { Component, OnInit } from '@angular/core';
import { combustible } from 'src/app/modelos/combustible';
import { sector } from 'src/app/modelos/sector';
import { ControlesService } from 'src/app/servicios/controles.service';
import { DashService } from 'src/app/servicios/dash.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  
})



export class DashBoardComponent implements OnInit {

 
 
rol:number | undefined;
  combustibles: Array<combustible> = [];
  sectores: Array<sector> = [];
  id_combustible: number = 0;
  id_sector:number = 0;
  descripcion: string = '';
  precio: number = 0;
  msgViolacion: boolean = false;
  msgGuardado: boolean = false;
  nombre_sec:string = '';
  totalMensual:any = []
  mes:number = 1

  constructor(
    private servicio: DashService,
    private control: ControlesService,

  ) {}

  ngOnInit(): void {
    var fechaActual = new Date();
 this.mes = fechaActual.getMonth() + 1;
 
    this.getCombustibles();
    this.getSectores();
    this.rol = this.control.getRol();
    this.panelDash();


  }

  meses  = [
    { mes: "Enero",id_mes: 1 },
    { mes: "Febrero", id_mes: 2 },
    { mes: "Marzo", id_mes: 3 },
    { mes: "Abril", id_mes: 4 },
    { mes: "Mayo", id_mes: 5 },
    { mes: "Junio", id_mes: 6 },
    { mes: "Julio", id_mes: 7 },
    { mes: "Agosto", id_mes: 8 },
    { mes: "Septiembre", id_mes: 9 },
    { mes: "Octubre", id_mes: 10 },
    { mes: "Noviembre", id_mes: 11 },
    { mes: "Diciembre", id_mes: 12 }
  ]
  

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

  nombreMes:string = ''
panelDash() {


  this.mes = Number(this.mes);

  switch (this.mes) {
    case 1:
      this.nombreMes = "Enero";
      break;
    case 2:
      this.nombreMes = "Febrero";
      break;
    case 3:
      this.nombreMes = "Marzo";
      break;
    case 4:
      this.nombreMes = "Abril";
      break;
    case 5:
      this.nombreMes = "Mayo";
      break;
    case 6:
      this.nombreMes = "Junio";
      break;
    case 7:
      this.nombreMes = "Julio";
      break;
    case 8:
      this.nombreMes = "Agosto";
      break;
    case 9:
      this.nombreMes = "Septiembre";
      break;
    case 10:
      this.nombreMes = "Octubre";
      break;
    case 11:
      this.nombreMes = "Noviembre";
      break;
    case 12:
      this.nombreMes = "Diciembre";
      break;
    default:
      this.nombreMes = "No se encontraron resultados";
  }

  this.servicio.panelDash(this.mes).subscribe(
    (data) => {
      
this.totalMensual = data;    },
    (error) => {
      console.error('Error al obtener datos:', error);
    }
  );
}

  insertarSector() {
    let sectorTemp: sector = new sector();
    sectorTemp.id_sector = this.id_sector;
    sectorTemp.nombre_sec = this.nombre_sec;

    if (this.nombre_sec == '') {
      this.msgViolacion = true;
      setTimeout(() => {
        this.msgViolacion = false;
      }, 3000);
      return;
    }

   

    this.servicio
      .insertarSector(sectorTemp)
      .subscribe((resultado: boolean) => {
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
  }

  msgEliminado: boolean = false;

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

















}
