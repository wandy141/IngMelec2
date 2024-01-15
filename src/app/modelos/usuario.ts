export class usuario {
          id_usuario:string ;
          contrasena:string ;
          id_empleado:number;
          nombre_empleado:string;
          rol:number;

    constructor() {
        this.id_usuario = '';
        this.contrasena = '';
        this.id_empleado = 0;
        this.nombre_empleado = '';
        this.rol = 0;
    }

}