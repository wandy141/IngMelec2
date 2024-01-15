import { Component, OnInit } from '@angular/core';
import { departamento } from 'src/app/modelos/departamento';
import { empleado } from 'src/app/modelos/empleado';
import { ControlesService } from 'src/app/servicios/controles.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnInit {

  buscadorChoferesTxt: string = '';

  msgBuscadorerr: boolean = false;
  msgUsuarioMal: boolean = false;
  msgUsuarioVacio: boolean = false;
  msgCampoVacio: boolean = false;
  msgGuardado: boolean = false;

  detener: boolean = false;

  departamento: Array<departamento> = [];
  id_empleado: number = 0;
  nombre: string = '';
  cedula: string = '';
  cargo: string = '';
  ingreso: any = '';
  nacimiento: any = '';
  id_departamento: number = 0;
  estado: number = 1;

  
  ngOnInit(): void {
    this.getDepartamento();
  }

  constructor(private servicio: ControlesService) {}

limpiar(){
  this.id_empleado= 0;
  this.nombre = '';
  this.cedula = '';
  this.cargo = '';
  this.ingreso = '';
  this.nacimiento = '';
  this.id_departamento  = 0;
  this.estado  = 0;
}

 
  buscarEmpleadosID(id_empleado: any) {
    if (id_empleado == '') {
      this.msgUsuarioVacio = true;
      setTimeout(() => {
        this.msgUsuarioVacio = false;
      }, 3000);
      return;
    }

    this.servicio.buscarEmpleadosID(id_empleado).subscribe((obj) => {
      if (Object.entries(obj).length === 0) {
        this.msgUsuarioMal = true;
        setTimeout(() => {
          this.msgUsuarioMal = false;
        }, 3000);

        return;
      }

      if (this.id_empleado !== null) {
        this.nombre = obj.nombre;
        this.cedula = obj.cedula;
        this.cargo = obj.cargo;
        this.ingreso = obj.ingreso;
        this.nacimiento = obj.nacimiento;
        this.id_departamento = obj.id_departamento;
        this.estado = obj.estado;
      }
    });
  }

  insertarEmpleado() {
    if (this.nombre == '') {
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.cedula == '') {
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.cargo == '') {
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.estado == 3) {
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

  
    if (this.ingreso == '' ) {
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    if (this.nacimiento == '') {
      this.msgCampoVacio = true;
      setTimeout(() => {
        this.msgCampoVacio = false;
      }, 3000);
      return;
    }

    let empleadoTemp: empleado = new empleado();
    empleadoTemp.id_empleado = this.id_empleado;
    empleadoTemp.nombre = this.nombre;
    empleadoTemp.cedula = this.cedula;
    empleadoTemp.cargo = this.cargo;
    empleadoTemp.ingreso = this.ingreso;
    empleadoTemp.nacimiento = this.nacimiento;
    empleadoTemp.id_departamento = this.id_departamento;
    empleadoTemp.estado = this.estado;

    this.servicio
      .insertEmpleado(empleadoTemp)
      .subscribe((resultado: boolean) => {
        if (resultado) {
          this.msgGuardado = true;
          this.limpiar();
          setTimeout(() => {
            this.msgGuardado = false;
          }, 3000);
        }
      });
  }

  getDepartamento() {
    this.servicio.getDepartamento().subscribe((obj) => {
      this.departamento = obj;
    });
  }
}
