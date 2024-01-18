import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { control } from 'src/app/modelos/control';
import { empleado } from 'src/app/modelos/empleado';
import { sector } from 'src/app/modelos/sector';
import { ControlesService } from 'src/app/servicios/controles.service';
import { DashService } from 'src/app/servicios/dash.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
})
export class ControlComponent implements OnInit {
  placa: string = '';
  combustible: any = undefined;
  kilometraje: any = undefined;
  kilometraje_act: any = undefined;
  descripcion: string = '';
  id_chofer: any = undefined;
  id_usuario: any = '';
  id_sector: number = 0;
  idPlacaSeguro: string = '';
  chasis: string = '';
  marca: string = '';
  ficha: string = '';

  fechah: string = '';
  id_combustible: any = undefined;

  choferes: Array<empleado> = [];
  sectores: Array<sector> = [];
  buscadorChoferesTxt: string = '';
  detener: boolean = false;
  descCombustible: string = '';
  precioCombustible: number = 0;
  consumoVehiculo: number = 0;

  noExisteChofer: boolean = false;
  msgBuscadorerr: boolean = false;
  msgError: boolean = false;
  msgExito: boolean = false;
  msgPlacaMal: boolean = false;
  msgPlacaNula: boolean = false;
  msgFichaMal: boolean = false;
  msgFichaNula: boolean = false;
  msgKm: boolean = false;

  constructor(private servicio: ControlesService, private http: HttpClient, private dash:DashService) {}

  ngOnInit() {
    this.actualizarHora();
    this.id_usuario = this.servicio.obtenerDatos();
    this.getSectores();
  
  }

  todoComb() {
    this.servicio.getCombustibles().subscribe((combustibles) => {
      const combustibleDeseado = combustibles.find(
        (combustible) => combustible.id_combustible === this.id_combustible
      );

      if (combustibleDeseado) {
        const descripcion = combustibleDeseado.descripcion;
        const precioGalon = combustibleDeseado.precio_galon;
        this.descCombustible = descripcion;
        this.precioCombustible = precioGalon;
      }
    });
  }



  getSectores() {
    this.dash.getSectores().subscribe((obj) => {
      this.sectores = obj;
    });
  }

  limpiar() {
    this.placa = '';
    this.combustible = undefined;
    this.kilometraje = undefined;
    this.kilometraje_act = undefined;
    this.descripcion = '';
    this.id_chofer = undefined;
    this.nombre_chofer = '';
    this.id_sector = 0;
    this.idPlacaSeguro = '';
    this.chasis = '';
    this.marca = '';
    this.ficha = '';
    this.buscadorChoferesTxt = '';
    this.choferes = [];
  }
recibo:string = '';




  actualizarHora() {
    this.http.get<any>('https://worldtimeapi.org/api/ip').subscribe(
      (response) => {
        let fechaUtc = new Date(response.utc_datetime);
        fechaUtc.setHours(fechaUtc.getHours() - 4);
        this.fechah = fechaUtc.toISOString().slice(0, 16);
      },
      (error) => {
        console.error('Error al obtener la hora externa:', error);
      }
    );
  }
  InsertarControl() {
    this.actualizarHora();

    let precio_galon = this.combustible * this.precioCombustible;
    let kilometrajeProyectado = this.combustible * this.consumoVehiculo;
    let controltemp: control = new control();
    controltemp.id_control = 0;
    controltemp.fecha = this.fechah;
    controltemp.placa = this.idPlacaSeguro;
    controltemp.nombre_comb = this.descCombustible;
    controltemp.combustible = this.combustible;
    controltemp.precio_combustible = this.precioCombustible;
    controltemp.precio_galon = precio_galon;
    controltemp.kilometraje = this.kilometraje;
    controltemp.kilometraje_act = this.kilometraje_act;
    controltemp.descripcion = this.descripcion;
    controltemp.id_chofer = this.id_chofer;
    controltemp.id_usuario = this.id_usuario;
    controltemp.id_sector = this.id_sector;
    controltemp.kilometraje_pro = kilometrajeProyectado;
    controltemp.consumo_vehiculo = this.consumoVehiculo;

    if (this.kilometraje_act !== undefined) {
      if (this.kilometraje > this.kilometraje_act) {
        this.msgKm = true;
        setTimeout(() => {
          this.msgKm = false;
        }, 4000);
        return;
      }
    }

    if (this.placa == '') {
      this.msgError = true;
      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.combustible == undefined) {
      this.msgError = true;
      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.id_sector == 0) {
      this.msgError = true;
      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.kilometraje_act == undefined) {
      this.msgError = true;
      setTimeout(() => {
        this.msgError = false;
      }, 3000);
    }

    if (this.descripcion == '') {
      this.msgError = true;
      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.id_chofer == undefined) {
      this.msgError = true;
      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    this.servicio.postControl(controltemp).subscribe((resultado: any) => {
      this.actualizarHora();
      if (resultado) {
        this.msgExito = true;
        this.limpiar();
        setTimeout(() => {
          this.msgExito = false;
        }, 3000);
      } else {
        console.log('fallo', resultado);

        try {
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  idvehiculo(placa: string) {
    this.todoComb();
    if (placa == '') {
      this.msgPlacaNula = true;
      setTimeout(() => {
        this.msgPlacaNula = false;
      }, 3000);
      return;
    }

    this.servicio.vehiculoId(placa).subscribe((obj) => {
      if (Object.entries(obj).length === 0) {
        this.msgPlacaMal = true;
        setTimeout(() => {
          this.msgPlacaMal = false;
        }, 3000);
        return;
      }

      if (placa !== null) {
        this.ficha = obj.ficha;
        this.chasis = obj.chasis;
        this.marca = obj.marca;
        this.kilometraje = obj.kilometraje;
        this.id_sector = obj.id_sector;
        this.id_combustible = obj.id_tipocomb;
        this.idPlacaSeguro = obj.placa;
        this.consumoVehiculo = obj.consumo_vehiculo;

        this.todoComb();
      }
    });
  }

  vehiculoFic(ficha: string) {
    if (this.ficha == '') {
      this.msgFichaNula = true;
      setTimeout(() => {
        this.msgFichaNula = false;
      }, 3000);
      return;
    }

    this.servicio.vehiculoFi(ficha).subscribe((obj) => {
      if (Object.entries(obj).length === 0) {
        this.msgFichaMal = true;
        setTimeout(() => {
          this.msgFichaMal = false;
        }, 3000);
        return;
      }

      if (ficha !== null) {
        this.idPlacaSeguro = obj.placa;
        this.placa = obj.placa;
        this.chasis = obj.chasis;
        this.marca = obj.marca;
        this.kilometraje = obj.kilometraje;
        this.id_sector = obj.id_sector;
        this.id_combustible = obj.id_tipocomb;
        this.consumoVehiculo = obj.consumo_vehiculo;
        this.todoComb();
      }
    });
  }

  todoChoferes() {
    this.servicio.todoChofer().subscribe((obj) => {
      this.choferes = obj;
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

    if (this.detener == true) {
      return;
    }
    this.detener = true;
    this.servicio.buscarResultados(termino).subscribe((obj) => {
      if (Object.entries(obj).length === 0) {
        this.noExisteChofer = true;
        setTimeout(() => {
          this.noExisteChofer = false;
        }, 3000);
      }
      this.choferes = obj;
    });
    this.detener = false;
  }
  nombre_chofer: string = '';

  seleccionarTxt(objChofer: empleado) {
    this.id_chofer = objChofer.id_empleado;
    this.nombre_chofer = objChofer.nombre;
  }
}
