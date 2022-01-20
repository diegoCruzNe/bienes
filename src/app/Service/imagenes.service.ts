import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Ruta } from '../Clases/Ruta';
import { Url } from '../Clases/Url';
import { Util } from '../Clases/Util';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  public readonly CONSULTAR_IMAGEN:string = Url.URL_ADMINISTRACION_IMAGEN + Ruta.RUTA_API + Ruta.RUTA_IMAGEN;
  private util = new Util();
  constructor(private httpClient: HttpClient) { }


  getImagen(prefijo:number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<Blob>(this.CONSULTAR_IMAGEN +`${prefijo}`,
      { headers : headers,responseType: 'blob' as 'json'})
      .pipe(catchError((err: HttpErrorResponse)=>this.util.mensajeError(err)));
  }
}
