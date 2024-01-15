import { Component } from '@angular/core';
import { empleado } from 'src/app/modelos/empleado';
import { usuario } from 'src/app/modelos/usuario';
import { ControlesService } from 'src/app/servicios/controles.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
id_usuario:string = '';
contrasena:string = '';
id_empleado:number = 0;
rol:number = 0;

buscadorChoferesTxt:string = ''

msgBuscadorerr:boolean = false;
msgUsuarioMal:boolean = false;
msgUsuarioVacio:boolean = false;
msgCampoVacio:boolean = false;
msgGuardado:boolean = false;


detener:boolean = false;
empleados : Array<empleado> = [];
empleado:string = '';

constructor(private servicio:ControlesService){

}

limpiar(){
  this.id_usuario = '';
  this.contrasena = '';
  this.id_empleado = 0;
  this.rol = 0;
  this.buscadorChoferesTxt = '';
  this.empleado = '';
  this.empleados = [];
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
    this.empleados = obj;
  });
  this.detener = false;
}


seleccionarTxt(objChofer: empleado) {
  this.id_empleado = objChofer.id_empleado;
  this.empleado = objChofer.nombre;
}



buscarUsuarioId(id_usuario:string){
if (id_usuario == '') {
  this.msgUsuarioVacio = true;
  setTimeout(() => {
    this.msgUsuarioVacio =false;
  }, 3000);
return;

}


this.servicio.buscarUsuariosID(this.id_usuario).subscribe((obj) => {
  



  if (Object.entries(obj).length === 0) {
this.msgUsuarioMal = true;
setTimeout(() => {
this.msgUsuarioMal = false;
}, 3000);

    return;
    
  }

  if (this.id_usuario !== null) {

    this.contrasena = obj.contrasena;
    this.id_empleado = obj.id_empleado;
    this.empleado = obj.nombre_empleado
    this.rol = obj.rol

  }
});
}



insertarUsuario(){
  if (this.id_usuario == '') {
    this.msgCampoVacio = true;
    setTimeout(() => {
      this.msgCampoVacio =false;
    }, 3000);
  return;
  
  }
  
  if (this.contrasena == '') {
    this.msgCampoVacio = true;
    setTimeout(() => {
      this.msgCampoVacio =false;
    }, 3000);
  return;
  }
  
  if (this.id_empleado == 0) {
    this.msgCampoVacio = true;
    setTimeout(() => {
      this.msgCampoVacio =false;
    }, 3000);
  return;
  }
  let usuarioTemp: usuario = new usuario();
  usuarioTemp.id_usuario = this.id_usuario;
  usuarioTemp.contrasena = this.contrasena;
  usuarioTemp.nombre_empleado = this.empleado;
  usuarioTemp.id_empleado = this.id_empleado;
  usuarioTemp.rol = this.rol;
 

  this.servicio.insertUsuario(usuarioTemp).subscribe((resultado: boolean) => {
if (resultado) {
  this.msgGuardado = true;
  this.limpiar();
  setTimeout(() => {
  this.msgGuardado = false;
    
  }, 3000);
}

  })

}


}
