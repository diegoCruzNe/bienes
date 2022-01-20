import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonios-app',
  templateUrl: './testimonios-app.component.html',
  styleUrls: ['./testimonios-app.component.css']
})
export class TestimoniosAppComponent implements OnInit {

  hidden_imagen_uno=false;
  hidden_imagen_dos=true;
  hidden_imagen_tres=true;
  constructor() { }

  ngOnInit(): void {
    this.hidden_imagen_uno=false;
    this.hidden_imagen_dos=true;
    this.hidden_imagen_tres=true;
  }

  primeraImagen(){
    this.hidden_imagen_uno=false;
    this.hidden_imagen_dos=true;
    this.hidden_imagen_tres=true;
  }

  segundaImagen(){
    this.hidden_imagen_uno=true;
    this.hidden_imagen_dos=false;
    this.hidden_imagen_tres=true;
  }

  terceraImagen(){
    this.hidden_imagen_uno=true;
    this.hidden_imagen_dos=true;
    this.hidden_imagen_tres=false;
  }

}
