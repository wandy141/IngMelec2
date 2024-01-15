import { Component, OnInit } from '@angular/core';
import { combustible } from 'src/app/modelos/combustible';
import { sector } from 'src/app/modelos/sector';
import { vehiculos } from 'src/app/modelos/vehiculos';
import { DashService } from 'src/app/servicios/dash.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css'],
})
export class VehiculoComponent implements OnInit {
  placa: string = '';
  chasis: string = '';
  ficha: string = '';
  anos: number[] = [];
  consumoVehiculos: number[] = [];
  consumoVehiculo:number = 0
  ano: number = 0;
  marca: string = '';
  id_tipocomb: number = 0;
  kilometraje = 0;
  sectores: Array<sector> = [];
  id_sector: number = 0;
  seguro: string = '';
  polisa: string = '';
  estado: number = 1;
  combustibles: Array<combustible> = [];

  
  msgFichaNula:boolean = false;
  msgFichaMal:boolean = false;
msgPlacaMal:boolean = false;
msgPlacaNula:boolean = false;
msgGuardado:boolean = false;


  constructor(private servicio: DashService) {}

  ngOnInit(): void {
    this.getCombustibles();
    this.getSectores();


    var today = new Date();
    var currentYear = today.getFullYear();
    
    for (let i = currentYear; 1980 <= i; i--) {
      this.anos.push(i);  }


      for (let i = 1; 150 >= i; i++) {
        this.consumoVehiculos.push(i);
        }
  
  


  }

  getCombustibles() {
    this.servicio.getCombustibles().subscribe((obj) => {
      this.combustibles = obj;
    });
  }

  getSectores() {
    this.servicio.getSectores().subscribe((obj) => {
      this.sectores = obj;
    });
  }


  msgVacio:boolean = false;
  campo:string = ''
  insertVehiculos(){
    let vehiculotemp: vehiculos = new vehiculos();
    vehiculotemp.placa = this.placa;
    vehiculotemp.chasis = this.chasis;
    vehiculotemp.ficha = this.ficha;
    vehiculotemp.ano = this.ano;
    vehiculotemp.marca = this.marca;
    vehiculotemp.id_tipocomb = this.id_tipocomb;
    vehiculotemp.kilometraje = this.kilometraje;
    vehiculotemp.id_sector = this.id_sector;
    vehiculotemp.seguro = this.seguro;
    vehiculotemp.polisa = this.polisa;
    vehiculotemp.estado = this.estado;
    vehiculotemp.consumo_vehiculo = this.consumoVehiculo;


if (this.placa == '') {
  this.campo = 'Placa';
  this.msgVacio = true;
  setTimeout(() => {
    this.msgVacio = false;
  }, 3000);
  return;
}




if (this.chasis == '') {
  this.campo = 'Chasis';
  this.msgVacio = true;
  setTimeout(() => {
    this.msgVacio = false;
  }, 3000);
  return;
}


if (this.ficha == '') {
  this.campo = 'Ficha';
  this.msgVacio = true;
  setTimeout(() => {
    this.msgVacio = false;
  }, 3000);
  return;
}

if (this.marca == '') {
  this.campo = 'Marca';
  this.msgVacio = true;
  setTimeout(() => {
    this.msgVacio = false;
  }, 3000);
  return;
}

if (this.seguro == '') {
  this.campo = 'Seguro';
  this.msgVacio = true;
  setTimeout(() => {
    this.msgVacio = false;
  }, 3000);
  return;
}
if (this.polisa == '') {
  this.campo = 'Polisa';
  this.msgVacio = true;
  setTimeout(() => {
    this.msgVacio = false;
  }, 3000);
  return;
}


if (this.ano == 0) {
  this.campo = 'Año';
  this.msgVacio = true;
  setTimeout(() => {
    this.msgVacio = false;
  }, 3000);
  return;
}


if (this.id_tipocomb == 0) {
  this.campo = 'Combustible';
  this.msgVacio = true;
  setTimeout(() => {
    this.msgVacio = false;
  }, 3000);
  return;
}


if (this.id_sector == 0) {
  this.campo = 'Sector';
  this.msgVacio = true;
  setTimeout(() => {
    this.msgVacio = false;
  }, 3000);
  return;
}



this.servicio.insertVehiculo(vehiculotemp).subscribe((resultado: boolean) => {
  
if (resultado){
this.msgGuardado = true;
this.limpiar();
setTimeout(() => {
  this.msgGuardado = false;
}, 3000);
  
}

})
  }



  idvehiculo(placa: string) {
    if (placa == '') {
      this.msgPlacaNula = true;
      setTimeout(() => {
        this.msgPlacaNula = false;
      }, 3000);
      return;
    }

    this.servicio.vehiculoPlaca(placa).subscribe((obj) => {
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
        this.id_tipocomb = obj.id_tipocomb;
        this.kilometraje = obj.kilometraje;
        this.id_sector = obj.id_sector;
        this.seguro = obj.seguro;
        this.polisa = obj.polisa;
        this.estado = obj.estado;
        this.ano = obj.ano;



 
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

    this.servicio.vehiculoFicha(ficha).subscribe((obj) => {
      if (Object.entries(obj).length === 0) {
        this.msgFichaMal = true;
        setTimeout(() => {
          this.msgFichaMal = false;
        }, 3000);
        return;
      }

      if (ficha !== null) {
        this.placa = obj.placa;
        this.chasis = obj.chasis;
        this.marca = obj.marca;
        this.id_tipocomb = obj.id_tipocomb;
        this.kilometraje = obj.kilometraje;
        this.id_sector = obj.id_sector;
        this.seguro = obj.seguro;
        this.polisa = obj.polisa;
        this.estado = obj.estado;
        this.ano = obj.ano;
      }
    });
  }


  limpiar(){

    this.placa = '';
    this.chasis = '';
    this.ficha = '';
    this.ano = 0;
    this.marca = '';
    this.id_tipocomb = 0;
    this.kilometraje = 0;
    this.id_sector = 0;
    this.consumoVehiculo = 0;
    this.seguro = '';
    this.polisa = '';
    this.estado = 1;
  }





}