import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlesService } from '../servicios/controles.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-secundario',
  templateUrl: './secundario.component.html',
  styleUrls: ['./secundario.component.css']
})
export class SecundarioComponent implements OnInit {

  rol:any;
  externo:any;
constructor(private router:Router, private servicio:ControlesService){

}

ngOnInit(): void {
  this.rol = this.servicio.obtenerRol();
  this.externo = this.servicio.obtenerexterno();
  initFlowbite();

}

salir(){
const msg = 'abandono'
  localStorage.setItem('usuario', msg);
this.router.navigate(['/login']);

}

isDropdownOpen = false;
isDropdownOpen2 = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

toggleDropdown2() {
  this.isDropdownOpen2 = !this.isDropdownOpen2;
}


}
