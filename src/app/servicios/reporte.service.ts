import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { control } from '../modelos/control';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor( public http:HttpClient) { }
  servidor = 'http://127.0.0.1:8000/api/';


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
  
  filtroReporteFechasNo(id_sector: number,orden:string,fechaIni:string,fechaFin:string):Observable<Array<control>> {
    
    return this.http.post<Array<control>>(this.servidor + 'filtroFechano',{
    
      id_sector:id_sector,
      orden:orden,
      fechaIni:fechaIni,
      fechaFin:fechaFin
    })
    
    }



    filtroPlaca(placaVehiculo: string, diasAnteriores: number, estado: number): Observable<Array<control>> {
      
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
    

    filtroFechaPlaca(placaVehiculo: string, estado: any,fechaIni:string,fechaFin:string): Observable<Array<control>> {
      console.log(fechaIni,fechaFin);
      
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
    


}