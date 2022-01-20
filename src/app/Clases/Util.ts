import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export class Util {
  constructor() {

  }

  mensajeError(error: HttpErrorResponse) {
    //instanceof : para capturar errores de lado del cliente
    if (error.error instanceof ErrorEvent) {
      console.log('Ocurrio un error en el cliente', error.error.message);
    } else {
      //status : obtenemos el codigo (404,etc), error : obtenemos el mensaje de lado del servidor
      //console.log('Error Status :', error.status)
      return throwError(error.error);
    }

    //retornamos usando la estrategia de Catch y Rethrow : capturar y reelanzar
    return throwError(error.error);
  }
}
