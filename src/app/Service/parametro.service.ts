import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Codigo } from '../Clases/codigo';
import { Ruta } from '../Clases/Ruta';
import { Url } from '../Clases/Url';
import { Util } from '../Clases/Util';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  private readonly CONSULTAR_CONCEPTO:string = Url.URL_ADMINISTRACION + Ruta.RUTA_API + Ruta.RUTA_CONCEPTO + '/individual/'
  private readonly CONSULTAR_PARAMETRO:string = Url.URL_ADMINISTRACION + Ruta.RUTA_API + Ruta.RUTA_PARAMETRO + '/individual/'
  private util = new Util();
  constructor(private httpClient: HttpClient) { }

  getConcepto(prefijo:number) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(this.CONSULTAR_CONCEPTO +`${prefijo}`,
      { headers : headers})
      .pipe(catchError((err: HttpErrorResponse)=>this.util.mensajeError(err)));
  }

  getParametro(prefijo:number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(this.CONSULTAR_PARAMETRO +`${prefijo}`,
      { headers : headers})
      .pipe(catchError((err: HttpErrorResponse)=>this.util.mensajeError(err)));

  }

  listarParametrosCaracteristicas(prefijo:Number){
    return this.httpClient.get<Codigo>(this.CONSULTAR_PARAMETRO+prefijo).pipe(
      catchError(e => {
        return throwError('Error');
      })
    );
  }

}
