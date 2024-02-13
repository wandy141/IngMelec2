import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { control } from '../modelos/control';
import { Observable, catchError, throwError } from 'rxjs';
import { AppConfig } from './url';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor( public http:HttpClient) { }
  servidor:string = AppConfig.servidor;



  getReporte(): Observable<Array<control>> {
    return this.http.get<Array<control>>(this.servidor + 'todoReporte', {});
  }




filtroReportes(id_sector: number, orden:string,dias_anteriores:number):Observable<Array<control>> {
return this.http.post<Array<control>>(this.servidor + 'filtroBrigada',{

  id_sector:id_sector,
  orden:orden,
  dias_anteriores:dias_anteriores,
})

}

filtroReporteFechas(id_sector: number,orden:string,fechaIni:string,fechaFin:string):Observable<Array<control>> {
  
  return this.http.post<Array<control>>(this.servidor + 'filtroFecha',{
  
    id_sector:id_sector,
    orden:orden,
    fechaIni:fechaIni,
    fechaFin:fechaFin
  })
  
  }








filtroReportesNo(id_sector: number, orden:string,dias_anteriores:number):Observable<Array<control>> {
  return this.http.post<Array<control>>(this.servidor + 'filtroBrigadano',{
  
    id_sector:id_sector,
    orden:orden,
    dias_anteriores:dias_anteriores,
  })
  
  }


  filtroReportesGS(id_gasolinera: number, orden:string,dias_anteriores:number):Observable<Array<control>> {
    return this.http.post<Array<control>>(this.servidor + 'filtroReporteGS',{
    
      id_gasolinera:id_gasolinera,
      orden:orden,
      dias_anteriores:dias_anteriores,
    })
    
    }





  
  filtroReporteFechasNo(id_sector: number,orden:string,fechaIni:string,fechaFin:string):Observable<Array<control>> {
    
    return this.http.post<Array<control>>(this.servidor + 'filtroFechano',{
    
      id_sector:id_sector,
      orden:orden,
      fechaIni:fechaIni,
      fechaFin:fechaFin
    })
    
    }

    filtroReporteFechasGS(id_gasolinera: number,orden:string,fechaIni:string,fechaFin:string):Observable<Array<control>> {
    
      return this.http.post<Array<control>>(this.servidor + 'filtroFechaGS',{
      
        id_gasolinera:id_gasolinera,
        orden:orden,
        fechaIni:fechaIni,
        fechaFin:fechaFin
      })
      
      }



    filtroPlaca(placaVehiculo: string, diasAnteriores: number, estado: any): Observable<Array<control>> {
      
      const requestBody = {
        placa: placaVehiculo,
        dias_anteriores: diasAnteriores,
        estado: estado
      };
    
      return this.http.post<Array<control>>(`${this.servidor}filtroPlaca`, requestBody)
        .pipe(
          catchError(error => {
            console.error('Error en la solicitud HTTP:', error);
            return throwError('Error en la solicitud HTTP');
          })
        );
    }


    filtroPlacano(placaVehiculo: string, diasAnteriores: number): Observable<Array<control>> {
      
      const requestBody = {
        placa: placaVehiculo,
        dias_anteriores: diasAnteriores,
      };
    
      return this.http.post<Array<control>>(`${this.servidor}filtroPlacano`, requestBody)
        .pipe(
          catchError(error => {
            console.error('Error en la solicitud HTTP:', error);
            return throwError('Error en la solicitud HTTP');
          })
        );
    }


    filtroFechaPlaca(placaVehiculo: string, estado: any,fechaIni:string,fechaFin:string): Observable<Array<control>> {
      const requestBody = {
        placa: placaVehiculo,
        estado: estado,
        fechaInicio: fechaIni,
        fechaFin: fechaFin
      };

    
      return this.http.post<Array<control>>(`${this.servidor}filtroFechaPlaca`, requestBody)
        .pipe(
          catchError(error => {
            console.error('Error en la solicitud HTTP:', error);
            return throwError('Error en la solicitud HTTP');
          })
        );
    }



    filtroFechaPlacano(placaVehiculo: string,fechaIni:string,fechaFin:string): Observable<Array<control>> {
      const requestBody = {
        placa: placaVehiculo,
        fechaInicio: fechaIni,
        fechaFin: fechaFin
      };

      return this.http.post<Array<control>>(`${this.servidor}filtroFechaPlacano`, requestBody)
        .pipe(
          catchError(error => {
            console.error('Error en la solicitud HTTP:', error);
            return throwError('Error en la solicitud HTTP');
          })
        );
    }


    filtroFechaEditar(buscador: string, fechaIni:string,fechaFin:string): Observable<Array<control>> {
      const requestBody = {
        placa: buscador,
        fechaIni: fechaIni,
        fechaFin: fechaFin
      };
    
      return this.http.post<Array<control>>(`${this.servidor}filtroFechaEditar`, requestBody)
        .pipe(
          catchError(error => {
            console.error('Error en la solicitud HTTP:', error);
            return throwError('Error en la solicitud HTTP');
          })
        );
    }
    

    filtroSoloFechaEdit( fechaIni:string,fechaFin:string): Observable<Array<control>> {
      const requestBody = {
        fechaIni: fechaIni,
        fechaFin: fechaFin
      };
    
      return this.http.post<Array<control>>(`${this.servidor}filtroSoloFechaEdit`, requestBody)
        .pipe(
          catchError(error => {
            console.error('Error en la solicitud HTTP:', error);
            return throwError('Error en la solicitud HTTP');
          })
        );
    }

}