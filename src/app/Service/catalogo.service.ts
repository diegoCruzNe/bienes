import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Ruta } from '../Clases/Ruta';
import { Url } from '../Clases/Url';
import { Util } from '../Clases/Util';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private readonly CONSULTAR_CATALGO:string = Url.URL_ADMINISTRACION_CATALOGO + Ruta.RUTA_API + Ruta.RUTA_CATALGO + '/list'
  private util = new Util();
  constructor(private httpClient: HttpClient) { }


  getCatalogo() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(this.CONSULTAR_CATALGO,
      { headers : headers})
      .pipe(catchError((err: HttpErrorResponse)=>this.util.mensajeError(err)));
  }
}
