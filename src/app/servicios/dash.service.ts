import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combustible } from '../modelos/combustible';
import { Observable } from 'rxjs';
import { sector } from '../modelos/sector';
import { vehiculos } from '../modelos/vehiculos';
import { AppConfig } from './url';
import { gasolinera } from '../modelos/gasolinera';
import { ubicacion } from '../modelos/ubicacion_sector';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  constructor(public http: HttpClient) {}
  servidor:string = AppConfig.servidor;

  insertCombustible(combTemp: combustible): Observable<boolean> {
    return this.http.post<boolean>(this.servidor + 'inserComb', {
      combustible: combTemp,
    });
  }


  insertarSector(sectorTemp: sector): Observable<boolean> {
    return this.http.post<boolean>(this.servidor + 'insertarSectores', {
      sector: sectorTemp,
    });
  }



  eliminarCombustible(id: number): Observable<any> {
    const url = `${this.servidor}eliminar/${id}`;
    console.log(url);

    return this.http.delete(url);
  }

  getCombustibles() {
    return this.http.get<Array<combustible>>(this.servidor + 'combustible');
  }

  getSectores() {
    return this.http.get<Array<sector>>(this.servidor + 'sectores');
  }

  obtenerGasolinerasPorSector(id_sector:number){
    return this.http.post<any>(this.servidor + 'obtenerGasolinerasPorSector',{
      id_sector: id_sector
    });
  }

  getGasolineras() {
    return this.http.get<Array<any>>(this.servidor + 'gasolineras');
  }

  vehiculoPlaca(placa:string):Observable<vehiculos>{
    return this.http.post<vehiculos>(this.servidor + 'vehiculoPlaca', {
      placa:placa,
    })
    }
    
    vehiculoFicha(ficha:string):Observable<vehiculos>{
    return this.http.post<vehiculos>(this.servidor + 'vehiculoFicha',{
    ficha:ficha
    })
    }
    

  insertVehiculo(vehiculoTemp: vehiculos): Observable<boolean> {
    return this.http.post<boolean>(this.servidor + 'insertarVehiculo', {
      vehiculos: vehiculoTemp,
    });
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
    
    panelDash(mes:number):Observable<any>{
      return this.http.post<any>(this.servidor + 'consumosMensuales',{
        mes:mes
      })
      }
      
      panelDashGS(mes:number):Observable<any>{
        return this.http.post<any>(this.servidor + 'consumosMensualesGS',{
          mes:mes
        })
        }
        


      

      getUbicaciones() {
        return this.http.get<Array<any>>(this.servidor + 'ubicaciones');
      }

      insertarGasolinera(gasolineraTemp: gasolinera): Observable<boolean> {
        return this.http.post<boolean>(this.servidor + 'insertarGasolinera', {
          gasolinera: gasolineraTemp,
        });
      }


      insertarUbicacion(ubicacionTemp: ubicacion): Observable<boolean> {
        return this.http.post<boolean>(this.servidor + 'insertarUbicacion', {
          ubicacion: ubicacionTemp,
        });
      }

}
