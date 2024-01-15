import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ControlesService } from 'src/app/servicios/controles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  msgPassword:boolean = false;
  msgError:boolean = false;
  acceder:boolean = true;
carga:boolean = false;
  usuario:string = '';
  password:string = '';
  accediendo:boolean = false;
  hayerrores:boolean = false;



constructor(private servicio: ControlesService, private router: Router) {

}

  entrar(){
    this.msgPassword = false;
    this.accediendo = false;
    this.hayerrores = false;
    this.acceder = true;
    this.carga = false;
    if (this.accediendo) {
      return;
    }

   

    if (this.usuario == '') {
      this.msgPassword = true;
      setTimeout(() => {
        this.msgPassword = false;
      }, 3000);
      this.hayerrores = true;
    }

    if (this.password == '') {
      this.msgPassword = true;
      setTimeout(() => {
        this.msgPassword = false;
      }, 3000);
      this.hayerrores = true;
    }
    if (this.hayerrores) {
      return;
    }
    this.acceder = false;
    this.carga = true;
    this.accediendo = true;
    try {
    this.servicio
      .login(this.usuario, this.password)
      .subscribe((retorno: any) => {
        
          if(retorno.rol != 0){

       
        if (retorno.resultado == true) {
          localStorage.setItem('usuario', retorno.id_usuario);
          this.servicio.setRol(retorno.rol);
          if (retorno.rol != 2) {
            this.router.navigate(['side/dash']);
            
          }else{
            this.router.navigate(['side/control']);

          }
              }

              


         else {
          this.carga = false;
          this.acceder = true;
          this.msgError = true;
          setTimeout(() => {
            this.msgError = false;
          }, 3000);
        }
      } else {
        this.carga = false;
        this.acceder = true;
        this.msgError = true;
        setTimeout(() => {
          this.msgError = false;
        }, 3000);
      }

      });
    } catch (error) {
      this.carga = false;
    }

  }


 

}
