import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Ruta } from '../Clases/Ruta';
import { Url } from '../Clases/Url';
import { Util } from '../Clases/Util';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  private readonly CONSULTAR_DEPARTAMENTO:string = Url.URL_ADMINISTRACION_UBIGEO + Ruta.RUTA_API + Ruta.RUTA_UBIGEO + '/departamentos'
  private readonly CONSULTAR_PROVINCIA:string = Url.URL_ADMINISTRACION_UBIGEO + Ruta.RUTA_API + Ruta.RUTA_UBIGEO + '/provincias/'
  private readonly CONSULTAR_DISTRITO:string = Url.URL_ADMINISTRACION_UBIGEO + Ruta.RUTA_API + Ruta.RUTA_UBIGEO + '/distritos/'
  private util = new Util();
  constructor(private httpClient: HttpClient) { }

  getDepartamento() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(this.CONSULTAR_DEPARTAMENTO,
      { headers : headers})
      .pipe(catchError((err: HttpErrorResponse)=>this.util.mensajeError(err)));
  }
  getProvincia(idDepartamento:number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(this.CONSULTAR_PROVINCIA +`${idDepartamento}`,
      { headers : headers})
      .pipe(catchError((err: HttpErrorResponse)=>this.util.mensajeError(err)));
  }
  getDistrito(idProvincia:number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(this.CONSULTAR_DISTRITO +`${idProvincia}`,
      { headers : headers})
      .pipe(catchError((err: HttpErrorResponse)=>this.util.mensajeError(err)));
  }
}
