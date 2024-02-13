import { Component, OnInit } from '@angular/core';
import { control } from 'src/app/modelos/control';
import { empleado } from 'src/app/modelos/empleado';
import { sector } from 'src/app/modelos/sector';
import { ControlesService } from 'src/app/servicios/controles.service';
import { DashService } from 'src/app/servicios/dash.service';
import { ReporteService } from 'src/app/servicios/reporte.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  id_gasolinera: number = 0;
  id_control: number = 0;
  precio_combustible: number = 0;
  combustible: number = 0;
  costo_galon: number = 0;
  kilometraje: number = 0;
  kilometraje_act: number = 0;
  kilometraje_rec: number = 0;
  kilometraje_pro: number = 0;
  id_empleado: number = 0;
  id_sector: number = 0;
  estado: number = 0;
  valet: number = 0;
  diferencia_km: number = 0;

  buscadorPlaca: string = '';
  fechaIni: string = '';
  fechaFin: string = '';
  placa: string = '';
  ficha_vehiculo: string = '';
  descripcion: string = '';
  empleado: string = '';
  buscadorChoferesTxt: string = '';
  campo: string = '';

  msgVacio: boolean = false;
  msgBuscadorerr: boolean = false;
  msgUsuarioMal: boolean = false;
  msgUsuarioVacio: boolean = false;
  msgCampoVacio: boolean = false;
  msgGuardado: boolean = false;
  msgNoExistente: boolean = false;
  msgBuscadorVacio: boolean = false;

  todoReporte: Array<control> = [];
  sectores: Array<sector> = [];
  empleados: Array<empleado> = [];
  gasolineras: any = [];

  ngOnInit(): void {
    this.getSectores();
    this.getGasolinerasAll();

    const currentDate = new Date();
    this.fechaFin = currentDate.toISOString().split('T')[0];

    // Obtener la fecha de tres días atrás
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);
    this.fechaIni = threeDaysAgo.toISOString().split('T')[0];

    this.filtrarReporteSoloFechas();
  }
  constructor(
    private servicio: ReporteService,
    private dash: DashService,
    private control: ControlesService
  ) {}

  reportes() {
    this.servicio.getReporte().subscribe((listado) => {
      this.todoReporte = listado;
    });
  }

  getGasolinerasAll() {
    this.dash.getGasolineras().subscribe((listado) => {
      this.gasolineras = listado;
    });
    
  }

  getSectores() {
    this.dash.getSectores().subscribe((obj) => {
      this.sectores = obj;
    });
  }

  buscador(termino: string) {
    if (this.buscadorChoferesTxt === '') {
      this.msgBuscadorerr = true;
      setTimeout(() => {
        this.msgBuscadorerr = false;
      }, 3000);
      return;
    }

    this.control.buscarResultados(termino).subscribe((obj) => {
      this.empleados = obj;
    });
  }

  seleccionarTxt(objChofer: empleado) {
    this.id_empleado = objChofer.id_empleado;
    this.empleado = objChofer.nombre;
  }

  seleccionarControl(objControl: control) {

    this.id_control = objControl.id_control;
    this.id_empleado = objControl.id_chofer;
    this.empleado = objControl.nombre_chofer;
    this.id_sector = objControl.id_sector;
    this.estado = objControl.estado;
    this.descripcion = objControl.descripcion;
    this.diferencia_km = objControl.diferencia_km;
    this.kilometraje_pro = objControl.kilometraje_pro;
    this.kilometraje_rec = objControl.kilometraje_rec;
    this.kilometraje_act = objControl.kilometraje_act;
    this.kilometraje = objControl.kilometraje;
    this.costo_galon = objControl.precio_galon;
    this.ficha_vehiculo = objControl.ficha_vehiculo;
    this.placa = objControl.placa;
    this.precio_combustible = objControl.precio_combustible;
    this.costo_galon = objControl.precio_galon;
    this.combustible = objControl.combustible;
    this.valet = objControl.valet;
this.id_gasolinera = objControl.id_gasolinera;

this.gasolinerasPorSector()
  }

  insertarEdit() {
    if (this.placa == '') {
      this.campo = 'Placa';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.ficha_vehiculo == '') {
      this.campo = 'Ficha';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.valet == undefined || this.valet == null) {
      this.campo = 'Valet';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (
      this.precio_combustible == undefined ||
      this.precio_combustible == null || this.precio_combustible < 0
    ) {
      this.campo = 'Precio combustible';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.combustible == undefined || this.combustible == null || this.combustible < 0) {
      this.campo = 'Galones combustible';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.id_gasolinera == 0 ) {
      this.campo = 'Gasolinera';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.costo_galon == undefined || this.costo_galon == null ||  this.costo_galon < 0) {
      this.campo = 'Costo total';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.kilometraje == undefined || this.kilometraje == null || this.kilometraje < 0) {
      this.campo = 'Kilometraje anterior';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.kilometraje_act == undefined || this.kilometraje_act == null || this.kilometraje_act < 0   ) {
      this.campo = 'Kilometraje actual';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.kilometraje_rec == undefined || this.kilometraje_rec == null || this.kilometraje_rec < 0   ) {
      this.campo = 'Kilometraje recorrido';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.kilometraje_pro == undefined || this.kilometraje_pro == null || this.kilometraje_pro < 0) {
      this.campo = 'Kilometraje proyectado';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.diferencia_km == undefined || this.diferencia_km == null || this.diferencia_km  < 0) {
      this.campo = 'Kilometraje faltantes';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.descripcion == '') {
      this.campo = 'Descripcion';
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    let controltemp: control = new control();

    controltemp.id_control = this.id_control;

    controltemp.placa = this.placa;
    controltemp.valet = this.valet;
    controltemp.ficha_vehiculo = this.ficha_vehiculo;
    controltemp.precio_combustible = this.precio_combustible;
    controltemp.combustible = this.combustible;
    controltemp.precio_galon = this.costo_galon;
    controltemp.precio_combustible = this.precio_combustible;
    controltemp.kilometraje = this.kilometraje;
    controltemp.kilometraje_act = this.kilometraje_act;
    controltemp.kilometraje_rec = this.kilometraje_rec;
    controltemp.kilometraje_pro = this.kilometraje_pro;
    controltemp.diferencia_km = this.diferencia_km;
    controltemp.descripcion = this.descripcion;
    controltemp.id_chofer = this.id_empleado;
    controltemp.nombre_chofer = this.empleado;
    controltemp.id_sector = this.id_sector;
    controltemp.estado = this.estado;
    controltemp.id_gasolinera = this.id_gasolinera;

    this.control.editarControl(controltemp).subscribe((resultado: boolean) => {
      if (resultado == false) {
        this.msgNoExistente = true;
        setTimeout(() => {
          this.msgNoExistente = false;
        }, 3000);
      } else {
        this. filtrarReporte();
        this.msgGuardado = true;
        setTimeout(() => {
          this.msgGuardado = false;
        }, 3000);
      }
    });
  }

  filtrarReporte() {
    if (this.buscadorPlaca == '') {
      this.servicio
        .filtroSoloFechaEdit(this.fechaIni, this.fechaFin)
        .subscribe((retorno: any) => {
          this.todoReporte = retorno;
        });
    } else {
      this.servicio
        .filtroFechaEditar(this.buscadorPlaca, this.fechaIni, this.fechaFin)
        .subscribe((retorno: any) => {
          this.todoReporte = retorno;
        });
    }
  }

  filtrarReporteSoloFechas() {
    this.servicio
      .filtroSoloFechaEdit(this.fechaIni, this.fechaFin)
      .subscribe((retorno: any) => {
        this.todoReporte = retorno;
      });
  }

  gasolinerasPorSector() {
    
  if (this.id_sector != 0 ) {
    
    this.dash.obtenerGasolinerasPorSector(this.id_sector).subscribe((obj) => {
      this.gasolineras = obj;
    });
  }

  }

  gasolinerasPorSectorCambio() {
    
    if (this.id_sector != 0 ) {
      
      this.dash.obtenerGasolinerasPorSector(this.id_sector).subscribe((obj) => {
        this.gasolineras = obj;
        this.id_gasolinera = 0;
      });
    }
  
    }
  
    
  // mostrarAlertaSiNoSeleccionaSector() {
  //   if (this.id_sector == 0) {
  //     // Si el id_sector no está seleccionado, mostrar alerta
  //     alert(
  //       'Por favor, selecciona primero un sector antes de elegir una gasolinera.'
  //     );
  //   } else {
  //   }
  // }
}
