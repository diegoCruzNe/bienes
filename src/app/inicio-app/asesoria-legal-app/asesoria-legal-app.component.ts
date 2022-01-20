import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { constante } from 'src/app/Clases/constante';
import { concepto, parametrizacion, parametro } from 'src/app/interfaces/parametro';
import { ParametroService } from 'src/app/Service/parametro.service';

@Component({
  selector: 'app-asesoria-legal-app',
  templateUrl: './asesoria-legal-app.component.html',
  styleUrls: ['./asesoria-legal-app.component.css']
})
export class AsesoriaLegalAppComponent implements OnInit {

  public listDocumento:parametrizacion[]=[];
  public listTipoInmueble:concepto[]=[];
  public listTipoDocumento: concepto[]=[];
  public listTipoAsesoria: parametro[]=[];
  public listRequisitos: parametro[]=[];
  public checksi = false;
  public checkno = false;
  public listNombresArchivos:any = [];
  constructor(private parametroService: ParametroService) { }

  ngOnInit(): void {
    this.consultarTipoDocumento();
    this.consultarTipoInmueble();
    this.consultarTipoAsesoria();
    this.consultarRequisitos();
  }

  consultarTipoDocumento() {
    let prefijo = 1;
    this.parametroService.getConcepto(prefijo)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
      this.listTipoDocumento = response.cursor;
    })
  }

  consultarTipoInmueble() {
    let prefijo = 2;
    this.parametroService.getConcepto(prefijo)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
      this.listTipoInmueble = response.cursor;
    })
  }
  consultarTipoAsesoria() {
    let prefijo = 3;
    this.parametroService.getParametro(prefijo)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
      this.listTipoAsesoria = response.cursor;
    })
  }

  consultarRequisitos() {
    let prefijo = 4;
    this.parametroService.getParametro(prefijo)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
      this.listRequisitos = response.cursor;

    })
  }
  onClickCheckSi():void{
    if (this.checksi = true)
    {
      this.checkno = false;
    }

  }
  onClickCheckNo():void{
    if (this.checkno = true)
    {
      this.checksi = false;
    }

  }
  subirArchivos(event:any):void{
    console.log("PASO 1");
    this.listNombresArchivos= [];

    if (event.target.files.length == 0) {
      console.log("PASO 2");
      return;
    }
    if (event.target.files.length >=0) {
      console.log("PASO 3");
      for (let i=0;i<event.target.files.length;i++) {
        this.listNombresArchivos[i] = event.target.files[i].name;
      }
    }
    console.log(this.listNombresArchivos);
  }


}
