import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlesService } from '../servicios/controles.service';

@Component({
  selector: 'app-secundario',
  templateUrl: './secundario.component.html',
  styleUrls: ['./secundario.component.css']
})
export class SecundarioComponent implements OnInit {

  rol:number | undefined;
constructor(private router:Router, private servicio:ControlesService){

}

ngOnInit(): void {
  this.rol = this.servicio.getRol();
}

salir(){
const msg = 'abandono'
  localStorage.setItem('usuario', msg);
this.router.navigate(['/login']);

}

isDropdownOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

}
