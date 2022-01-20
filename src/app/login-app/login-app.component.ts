import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Clases/usuario';
import { ServiceService } from 'src/app/Service/service.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as forge from 'node-forge';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent implements OnInit {

  usuario:Usuario;
  publicKey: string = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAskgPKBcNpz71mi4NSYa5
  mazJrO0WZim7T2yy7qPxk2NqQE7OmWWakLJcaeUYnI0kO3yC57vck66RPCjKxWuW
  SGZ7dHXe0bWb5IXjcT4mNdnUIalR+lV8czsoH/wDUvkQdG1SJ+IxzW64WvoaCRZ+
  /4wBF2cSUh9oLwGEXiodUJ9oJXFZVPKGCEjPcBI0vC2ADBRmVQ1sKsZg8zbHN+gu
  U9rPLFzN4YNrCnEsSezVw/W1FKVS8J/Xx4HSSg7AyVwniz8eHi0e3a8VzFg+H09I
  5wK+w39sjDYfAdnJUkr6PjtSbN4/Sg/NMkKB2Ngn8oj7LCfe/7RNqIdiS+dQuSFg
  eQIDAQAB
  -----END PUBLIC KEY-----`;
  n_seleccionar_empresa = 0;
  constructor(private _httpClient: HttpClient,private router:Router,private service: ServiceService,private toastr: ToastrService) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login(){
    let rsa = forge.pki.publicKeyFromPem(this.publicKey);
    let encryptedPassword = window.btoa(rsa.encrypt(String(this.usuario.usua_clave)));
    console.log(this.usuario.usua_clave)
    console.log(rsa.encrypt(String(this.usuario.usua_clave)))
    console.log(window.btoa(rsa.encrypt(String(this.usuario.usua_clave))))
    var payload = { "UserName": this.usuario.usua_email, "Password": encryptedPassword };

    if(this.n_seleccionar_empresa == 0){
      this.toastr.error('Seleccionar una empresa', 'Completar Datos');
    }else if(this.usuario.usua_email == ''){
      this.toastr.error('Ingrese su usuario', 'Completar Datos');
    }else if(this.usuario.usua_clave == ''){
      this.toastr.error('Ingrese su constraseña', 'Completar Datos');
    }else{
/*      this._httpClient.post<boolean>(`http://localhost:5000/api/login`, payload).subscribe(res => {
        console.log(res);
        if(res == true){  */
          this.router.navigate(["inicio-app"]);
/*          }else{
          this.toastr.error('Credenciales incorrectas', 'Error');
        }
      }, err => {
          console.error(err);
      }); */
    }


  }

  showError() {
    this.toastr.error('Seleccionar una empresa', 'Completar Datos');
  }

  seleccionarEmpresa(value:any){
    this.n_seleccionar_empresa = value;
  }

}
