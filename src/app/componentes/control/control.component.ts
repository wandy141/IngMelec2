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
  id_combustible: any = undefined;
  valet: any = undefined;
  id_chofer: any = undefined;

  descripcion: string = '';
  id_usuario: any = '';
  id_sector: number = 0;
  idPlacaSeguro: string = '';
  chasis: string = '';
  marca: string = '';
  ficha: string = '';
  fechah: string = '';
  campoVacio: string = '';
  buscadorChoferesTxt: string = '';
  descCombustible: string = '';
  campo: string = '';

  msgSeleccionarSector: boolean = false;
  noExisteChofer: boolean = false;
  msgBuscadorerr: boolean = false;
  msgError: boolean = false;
  msgExito: boolean = false;
  msgPlacaMal: boolean = false;
  msgPlacaNula: boolean = false;
  msgFichaMal: boolean = false;
  msgFichaNula: boolean = false;
  msgKm: boolean = false;
  msgExcesoGL: boolean = false;
  msgErrores: boolean = false;
  msgExisteValet: boolean = false;
  detener: boolean = false;

  precioCombustible: number = 0;
  consumoVehiculo: number = 0;
  limite_combustible: number = 0;
  consumo_mes: number = 0;
  externo: any = 0;
  id_gasolinera: number = 0;
  caracteres: number = 0;

  gasolineras: any = [];
  choferes: Array<empleado> = [];
  sectores: Array<sector> = [];

  msgLimiteCaracteres: boolean = false;
  constructor(
    private servicio: ControlesService,
    private http: HttpClient,
    private dash: DashService
  ) {}

  ngOnInit() {
    this.actualizarHora();
    this.id_usuario = this.servicio.obtenerDatos();
    this.externo = this.servicio.obtenerexterno();
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
    this.combustible = undefined;
    this.kilometraje = undefined;
    this.kilometraje_act = undefined;
    this.id_chofer = undefined;
    this.placa = '';
    this.descripcion = '';
    this.nombre_chofer = '';
    this.idPlacaSeguro = '';
    this.chasis = '';
    this.marca = '';
    this.ficha = '';
    this.buscadorChoferesTxt = '';
    this.valet = undefined;
    this.id_sector = 0;
    this.id_gasolinera = 0;
    this.consumo_mes = 0;

    this.choferes = [];
  }
  recibo: string = '';

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

  detener_insertar: boolean = false;

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
    controltemp.valet = this.valet;
    controltemp.id_gasolinera = this.id_gasolinera;



    //valet me quede
   




 

    


    
   

    if (this.consumo_mes + this.combustible > this.limite_combustible) {
      this.msgExcesoGL = true;
      setTimeout(() => {
        this.msgExcesoGL = false;
      }, 3000);
      return;
    }

    if (this.kilometraje_act !== undefined) {
      if (this.kilometraje > this.kilometraje_act) {
        this.msgKm = true;
        setTimeout(() => {
          this.msgKm = false;
        }, 4000);
        return;
      }
    }

    if (this.kilometraje_act == undefined || this.kilometraje_act < 0) {
      this.msgError = true;
      this.campoVacio = 'Kilometraje';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }


    if (this.kilometraje_act.toString().length >= 7) {
      this.campo = 'kilometraje actual';
      this.caracteres = 6;
      this.msgLimiteCaracteres = true;
      setTimeout(() => {
        this.msgLimiteCaracteres = false;
      }, 3000);
      return;
    }


    if (this.placa == '') {
      this.msgError = true;
      this.campoVacio = 'Placa';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.combustible == undefined || this.combustible <= 0) {
      this.msgError = true;
      this.campoVacio = 'Combustible';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }


    if (this.combustible.toString().length >= 3) {
      
      this.campo = 'combustible';
      this.caracteres = 2;
      this.msgLimiteCaracteres = true;
      setTimeout(() => {
        this.msgLimiteCaracteres = false;
      }, 3000);

      return;
    }

    if (this.valet == undefined) {
      this.msgError = true;
      this.campoVacio = 'Valet';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.valet <= 0) {
      this.msgError = true;
      this.campoVacio = 'Valet';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    
    


    if ( this.valet.toString().length >= 10) {
      
      this.campo = 'valet';
      this.caracteres = 9;
      this.msgLimiteCaracteres = true;
      setTimeout(() => {
        this.msgLimiteCaracteres = false;
      }, 3000);
      return;
    }



    if (this.id_sector == 0) {
      this.msgError = true;
      this.campoVacio = 'Sector';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.id_gasolinera == 0) {
      this.msgError = true;
      this.campoVacio = 'Gasolinera';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

  

    if (this.descripcion == '') {
      this.msgError = true;
      this.campoVacio = 'Descripcion';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.descripcion.length >= 201) {
      this.campo = 'descripcion';
      this.caracteres = 200;
      this.msgLimiteCaracteres = true;
      setTimeout(() => {
        this.msgLimiteCaracteres = false;
      }, 3000);
      return;
    }



    if (this.id_chofer == undefined) {
      this.msgError = true;
      this.campoVacio = 'Chofer';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.detener_insertar == true) {
      return;
    }
    this.detener_insertar = true;

    try {
      this.servicio.postControl(controltemp).subscribe((resultado: any) => {
        this.detener_insertar = false;

        this.actualizarHora();
        if (resultado.resultado == 'existe_valet') {
          this.msgExisteValet = true;
          setTimeout(() => {
            this.msgExisteValet = false;
          }, 3000);
          return;
        } else if (resultado.resultado == true) {
          this.msgExito = true;
          this.limpiar();
          setTimeout(() => {
            this.msgExito = false;
          }, 3000);
        } else if (resultado.resultado == false) {
          this.msgExcesoGL = true;
          setTimeout(() => {
            this.msgExcesoGL = false;
          }, 3000);
        } else {
          this.msgErrores = true;
          setTimeout(() => {
            this.msgErrores = false;
          }, 3000);
          console.log('fallo', resultado.message);
        }
      });
    } catch (error) {
      this.detener_insertar = false;

      this.msgErrores = true;
      setTimeout(() => {
        this.msgErrores = false;
      }, 3000);
      console.log(error);
    }
  }

  InsertarControl2() {
    this.actualizarHora();
    const valet2 = 0;
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
    controltemp.valet = valet2;
    controltemp.id_gasolinera = this.id_gasolinera;

   

    if (this.consumo_mes + this.combustible > this.limite_combustible) {
      this.msgExcesoGL = true;
      setTimeout(() => {
        this.msgExcesoGL = false;
      }, 3000);
      return;
    }

   

    if (this.kilometraje_act !== undefined) {
      if (this.kilometraje > this.kilometraje_act) {
        this.msgKm = true;
        setTimeout(() => {
          this.msgKm = false;
        }, 4000);
        return;
      }
    }

    if (this.kilometraje_act == undefined || this.kilometraje_act < 0) {
      this.msgError = true;
      this.campoVacio = 'Kilometraje';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.kilometraje_act.toString().length >= 7) {
      this.campo = 'kilometraje actual';
      this.caracteres = 6;
      this.msgLimiteCaracteres = true;
      setTimeout(() => {
        this.msgLimiteCaracteres = false;
      }, 3000);
      return;
    }


    if (this.placa == '') {
      this.msgError = true;
      this.campoVacio = 'Placa';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.combustible == undefined || this.combustible <= 0) {
      this.msgError = true;
      this.campoVacio = 'Combustible';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.combustible.toString().length >= 3) {
      
      this.campo = 'combustible';
      this.caracteres = 2;
      this.msgLimiteCaracteres = true;
      setTimeout(() => {
        this.msgLimiteCaracteres = false;
      }, 3000);

      return;
    }

 


    if (this.id_sector == 0) {
      this.msgError = true;
      this.campoVacio = 'Sector';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.id_gasolinera == 0) {
      this.msgError = true;
      this.campoVacio = 'Gasolinera';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

  

    if (this.descripcion == '') {
      this.msgError = true;
      this.campoVacio = 'Descripcion';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.descripcion.length >= 201) {
      this.campo = 'descripcion';
      this.caracteres = 200;
      this.msgLimiteCaracteres = true;
      setTimeout(() => {
        this.msgLimiteCaracteres = false;
      }, 3000);
      return;
    }


    if (this.id_chofer == undefined) {
      this.msgError = true;
      this.campoVacio = 'Chofer';

      setTimeout(() => {
        this.msgError = false;
      }, 3000);
      return;
    }

    if (this.detener_insertar == true) {
      return;
    }
    this.detener_insertar = true;

    try {
      this.servicio.postControl(controltemp).subscribe((resultado: any) => {
        this.detener_insertar = false;

        this.actualizarHora();
        if (resultado.resultado == 'existe_valet') {
          this.msgExisteValet = true;
          setTimeout(() => {
            this.msgExisteValet = false;
          }, 3000);
          return;
        } else if (resultado.resultado == true) {
          this.msgExito = true;
          this.limpiar();
          setTimeout(() => {
            this.msgExito = false;
          }, 3000);
        } else if (resultado.resultado == false) {
          this.msgExcesoGL = true;
          setTimeout(() => {
            this.msgExcesoGL = false;
          }, 3000);
        } else {
          this.msgErrores = true;
          setTimeout(() => {
            this.msgErrores = false;
          }, 3000);
          console.log('fallo', resultado.message);
        }
      });
    } catch (error) {
      this.detener_insertar = false;

      this.msgErrores = true;
      setTimeout(() => {
        this.msgErrores = false;
      }, 3000);
      console.log(error);
    }
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
        this.limite_combustible = obj.limite_combustible;
        this.todoComb();
        this.gasolinerasPorSector();
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
        this.consumo_mes = obj.consumo_mes;
        this.limite_combustible = obj.limite_combustible;
        this.todoComb();
        this.gasolinerasPorSector();
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

  SeleccionarEmpleado(objChofer: empleado) {
    this.id_chofer = objChofer.id_empleado;
    this.nombre_chofer = objChofer.nombre;
  }

  seleccionarTxt(objChofer: empleado) {
     const respuesta:any = prompt(
      `Ingrese la ficha de ${objChofer.nombre} para confirmar:`
    );
    if (respuesta !== null) {
      if (objChofer.id_empleado === respuesta) {
        this.SeleccionarEmpleado(objChofer);
      } else {
        alert('Las fichas no coinciden.');
      }
    }else{
      alert('El campo esta vacio.');
    }
  }


//ojo cambiar por ficha

  gasolinerasPorSector() {
    this.dash.obtenerGasolinerasPorSector(this.id_sector).subscribe((obj) => {
      this.gasolineras = obj;
      this.id_gasolinera = 0;
    });
  }

  mostrarAlertaSiNoSeleccionaSector() {
    if (this.id_sector == 0) {
      // Si el id_sector no está seleccionado, mostrar alerta
      alert(
        'Por favor, selecciona primero un sector antes de elegir una gasolinera.'
      );
    } else {
    }
  }
}
