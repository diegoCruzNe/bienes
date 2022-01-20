import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Clases/usuario';
import { ServiceService } from 'src/app/Service/service.service';
import { AuthenticationService } from '../../Service/authentication.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as forge from 'node-forge';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

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
  constructor(private _httpClient: HttpClient,private router:Router,private loginserviceA: AuthenticationService, private service: ServiceService,private loginservice: AuthenticationService) {
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

    this._httpClient.post<boolean>(`http://localhost:5000/api/login`, payload).subscribe(res => {
      /* this.btnClicked = true;
      this.loginSuccess = res; */
      console.log(res);
    }, err => {
        console.error(err);
    });
  }



}
