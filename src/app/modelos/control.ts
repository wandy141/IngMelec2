export class control {
    id_control:any;
    fecha:string;
    placa:string;
    combustible:any;
    precio_combustible:any;
    nombre_comb:string;
    precio_galon:number;
    kilometraje:any;
    kilometraje_act:any;
    kilometraje_rec:number;
    descripcion:string;
    id_chofer:any;
    id_usuario:any;
    id_sector:any;
    diferencia_km:any;
    kilometraje_pro:any;
    ficha_vehiculo:string;
    nombre_chofer:string;
    nombre_sector:string;
    
    
    
    
    
        constructor() {
            this.id_control = undefined;
            this.fecha = '';
            this.ficha_vehiculo = '';
            this.placa = '';
            this.nombre_comb = '' ;
            this.combustible = undefined;
            this.precio_galon = 0;
            this.kilometraje = undefined;
            this.kilometraje_act = undefined;
            this.kilometraje_rec = 0;
            this.descripcion = '';
            this.id_chofer = undefined;
            this.id_usuario = undefined; 
            this.id_sector = undefined;
            this.diferencia_km = undefined;
            this.kilometraje_pro = undefined;
            this.nombre_chofer = '';
            this.nombre_sector = '';
            this.precio_combustible = undefined;
    
        }
    }