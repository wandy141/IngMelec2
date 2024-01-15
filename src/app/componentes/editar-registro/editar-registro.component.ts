import { Component, OnInit } from '@angular/core';
import { control } from 'src/app/modelos/control';
import { empleado } from 'src/app/modelos/empleado';
import { sector } from 'src/app/modelos/sector';
import { ControlesService } from 'src/app/servicios/controles.service';
import { DashService } from 'src/app/servicios/dash.service';

@Component({
  selector: 'app-editar-registro',
  templateUrl: './editar-registro.component.html',
  styleUrls: ['./editar-registro.component.css']
})
export class EditarRegistroComponent implements OnInit{

controles:Array<control> = []
descripcion:string = '';
id_control:number = 0;
combustible:number = 0;
id_chofer:number = 0
nombre_chofer:string = '';
buscadorEmpleado:string = '';
msgGuardado:boolean = false;
msgVacio:boolean = false;
id_sector:number = 0;
sectores:Array<sector> = []
public usuario: string | null = localStorage.getItem('usuario');



constructor(private servicio: ControlesService, private dash : DashService){}

ngOnInit(): void {
  this.getControledit(this.usuario);
  this.getSectores();
  
}
getControledit(usuario:string | null){
this.servicio.todosControledit(usuario).subscribe((obj) => {
  this.controles = obj;

})

}

getSectores() {
  this.dash.getSectores().subscribe((obj) => {
    this.sectores = obj;
    
  });
}

llenarinput(objControl: control){

this.id_control = objControl.id_control;
this.combustible = objControl.combustible;
this.id_chofer = objControl.id_chofer;
this.nombre_chofer = objControl.nombre_chofer;
this.descripcion = objControl.descripcion;
this.id_sector = objControl.id_sector;



}

choferes:Array<empleado> = [];
buscador(termino: string) {
  if (this.nombre_chofer === '') {
    this.msgBuscadorerr = true;
    setTimeout(() => {
      this.msgBuscadorerr = false;
    }, 3000);
    return;
  }


  this.servicio.buscarResultados(termino).subscribe((obj) => {
    this.choferes = obj;
  this.listaChoferes = true;

  });
}

seleccionarTxt(objChofer: empleado) {
  this.id_chofer = objChofer.id_empleado;
  this.nombre_chofer = objChofer.nombre;
  this.listaChoferes = false;
}

listaChoferes:boolean = false;
msgBuscadorerr:boolean = false;

verBuscador(){
this.listaChoferes = !this.listaChoferes; 

}


insertarEdit(){

if (this.combustible <= 0) {
  this.msgVacio = true;
  setTimeout(() => {
    this.msgVacio = false;
  }, 3000);
  return;
}

if (this.descripcion == '') {
  this.msgVacio = true;
  setTimeout(() => {
  this.msgVacio = false;
  }, 3000);
  return;
}

  let controltemp: control = new control();
  controltemp.id_control = this.id_control;
  controltemp.descripcion = this.descripcion;
  controltemp.combustible = this.combustible;
  controltemp.id_chofer = this.id_chofer;
controltemp.nombre_chofer = this.nombre_chofer;
controltemp.id_sector = this.id_sector;


this.servicio.editarControl(controltemp).subscribe((resultado:boolean)=>{
  this.msgGuardado = true;
  setTimeout(() => {
    this.msgGuardado = false;
  }, 3000);
  this.getControledit(this.usuario);

} )
}


}
