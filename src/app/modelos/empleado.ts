export class empleado {

id_empleado:number;
nombre:string;
cedula:string;
cargo:string;
ingreso:Date;
nacimiento:Date;
id_departamento:number;
estado:number;





    constructor() {
        
this.id_empleado = 0;
this.nombre = '';
this.cedula = '';
this.cargo = '';
this.ingreso = new Date;
this.nacimiento = new Date;
this.id_departamento = 0;
this.estado = 0;


    }
}