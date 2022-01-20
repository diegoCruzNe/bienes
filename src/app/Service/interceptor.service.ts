import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService} from './authentication.service';
import { AuthService } from 'angularx-social-login';
import { SwPush } from '@angular/service-worker';
import Swal from 'sweetalert2';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  public readonly VAPID_PUBLIC_KEY = 'BAPGG2IY3Vn48d_H8QNuVLRErkBI0L7oDOOCAMUBqYMTMTzukaIAuB5OOcmkdeRICcyQocEwD-oxVc81YXXZPRY';
  token_usuario:any;
  id_usuario = localStorage.getItem("id_usuario");
  constructor(private router:Router,private authService: AuthService,private swPush: SwPush,private service:ServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (sessionStorage.getItem('username') && sessionStorage.getItem('token') && req.headers.get("skip")) {
      var token = sessionStorage.getItem('token')
      req = req.clone({
        setHeaders: {
          //Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE2MTU0MzUwMzcsImlhdCI6MTYxNTQxNzAzN30.Vqe4q3xJ3VZb9jOSFtZiimxC6nlehUa0klQpTc9eij7Jtp4sKMeZD9q54koOcyjqg2htinnc8KhYDgRapwoJ6Q",
          'Content-Type' : 'application/json',
          //'Accept'       : 'application/json',
          //'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE2MTU1MjI5ODYsImlhdCI6MTYxNTUwNDk4Nn0.6a45JKM2N1m5wmMuagGDBEtpCcK33TXRmyDqJU12lbH_3ZFD-b4WSuKmTACbgyGXtZD5f7tPKlZ6W7-07_UkCQ'
          'Authorization' : sessionStorage.getItem('token') || ''
        }
      });
      //console.log("Paso por el interpector");
    }
  
    return next.handle(req).pipe(
      catchError(this.manejarError)
    );
  }

  cerrarSesion():void{
    let me = this;
    swal.fire('Lo sentimos', 'Servidor detenido repentinamente', 'warning');
    me.router.navigate([""]);
    setTimeout(()=>{ 
      sessionStorage.clear();
      localStorage.clear();
      localStorage.removeItem("variableInicio");
      localStorage.removeItem("id_usuario");
      me.signOut();
      window.location.reload();
    },2000);
  };

    manejarError( error: HttpErrorResponse){
      console.log("errorrr");
      console.warn(error);
      return throwError(error);
  }


  signOut(): void {
    this.authService.signOut();
  }

}
