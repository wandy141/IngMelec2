import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AccesoGuard } from './servicios/acceso.guard';


const routes: Routes = [
  { path: '', component: LoginComponent,pathMatch:'full'},
  { path: 'login', component: LoginComponent, pathMatch:'full'},
  {
    path: 'secundario', canActivate: [AccesoGuard],
    loadChildren: () =>
      import('./secundario/secundario.module').then(
        (m) => m.SecundarioModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
