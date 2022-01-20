import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "angularx-social-login";
import { NgxSpinnerService } from 'ngx-spinner';

declare let Culqi: any;
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  UrlAuthenticate = 'https://api.pe/';
  Url = 'https://api.pe/api';

  version = '1.20';

  private HttpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(private http:HttpClient,private router:Router,private authService: AuthService,private spinnerService: NgxSpinnerService) {


  }

  scrool_focus_superior(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

}
