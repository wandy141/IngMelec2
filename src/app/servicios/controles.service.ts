import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { control } from '../modelos/control';
import { vehiculos } from '../modelos/vehiculos';
import { combustible } from '../modelos/combustible';
import { empleado } from '../modelos/empleado';
import { usuario } from '../modelos/usuario';
import { departamento } from '../modelos/departamento';

@Injectable({
  providedIn: 'root'
})
export class ControlesService {

  constructor( public http:HttpClient) { }
  servidor = 'http://127.0.0.1:8000/api/';

postControl(controltmp:control):Observable<any>{
return this.http.post<any>(this.servidor + 'control',{
  control:controltmp
})

}


vehiculoId(placa:string):Observable<vehiculos>{
return this.http.post<vehiculos>(this.servidor + 'vehiculoid', {
  placa:placa,
})
}

vehiculoFi(ficha:string):Observable<vehiculos>{
return this.http.post<vehiculos>(this.servidor + 'vehiculofi',{
ficha:ficha
})
}



login(id_usuario: string, contrasena: string) {
  return this.http.post<any>(this.servidor + 'login', {

    id_usuario: id_usuario,
    contrasena: contrasena,
  });
}


obtenerDatos()  {
  return localStorage.getItem('usuario');
}

todoChofer():Observable<Array<empleado>> {
  return this.http.get<Array<empleado>>(this.servidor + 'empleado',{});
}

//buscador del imput chofer
buscarResultados(termino:string): Observable<Array<empleado>> {
  return this.http.post<Array<empleado>>(this.servidor + 'peticion', {
    peticion:termino
  });

}



getCombustibles(){
  return this.http.get<Array<combustible>>(this.servidor + 'combustible');
}

private user: number | undefined;

getUser() {
  return this.user;
}

setUser(user: number) {
  this.user = user;
}


private rol: number | undefined;

getRol() {
  return this.rol;
}

setRol(rol: number) {
  this.rol = rol;
}





todosControledit(usuario: string | null): Observable<Array<control>> {
  return this.http.post<Array<control>>(this.servidor + 'getControl', {
    usuario:usuario
  });
}


editarControl(controltmp:control){
  return this.http.post<any>(this.servidor + 'editarReportes',{
    control:controltmp
  })


}


buscarUsuariosID(id_usuario:string):Observable<usuario>{
  return this.http.post<usuario>(this.servidor + 'buscarUsuariosId', {
    id_usuario:id_usuario,
  })
  }


  buscarEmpleadosID(id_empleado:number):Observable<empleado>{
    return this.http.post<empleado>(this.servidor + 'buscarEmpleados', {
      id_empleado:id_empleado,
    })
    }
  insertUsuario(usuarioTemp: usuario): Observable<boolean> {
    return this.http.post<boolean>(this.servidor + 'insertarUsuario', {
      usuario: usuarioTemp,
    });
  }

  insertEmpleado(empleadoTemp: empleado): Observable<boolean> {
    return this.http.post<boolean>(this.servidor + 'insertarEmpleado', {
      empleado: empleadoTemp,
    });
  }



  getDepartamento(){
    return this.http.get<Array<departamento>>(this.servidor + 'getDepartamento');
  }


  
}