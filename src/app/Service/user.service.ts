import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Ruta } from '../Clases/Ruta';
import { Url } from '../Clases/Url';
import { Util } from '../Clases/Util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly VALIDAR_USUARIO:string = Url.URL_ADMINISTRACION + Ruta.RUTA_API + '/Login/';
  private util = new Util();
  constructor(private httpClient: HttpClient) { }

  getValidarUsuario(ruc:string,email:string,clave:string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>(this.VALIDAR_USUARIO +`${ruc}/${email}/${clave}`,
      { headers : headers})
      .pipe(catchError((err: HttpErrorResponse)=>this.util.mensajeError(err)));
  }
}
