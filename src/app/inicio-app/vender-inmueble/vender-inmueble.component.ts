import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { constante } from 'src/app/Clases/constante';
import { Marcador } from 'src/app/Clases/Marcador';
import { Parametro } from 'src/app/Clases/parametros';
import { Departamento, Distrito, Provincia } from 'src/app/Clases/ubigeo';
import { concepto, parametrizacion, parametro } from 'src/app/interfaces/parametro';
import { ParametroService } from 'src/app/Service/parametro.service';
import { UbicacionService } from 'src/app/Service/ubicacion.service';
import { UbigeoService } from 'src/app/Service/ubigeo.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-vender-inmueble',
  templateUrl: './vender-inmueble.component.html',
  styleUrls: ['./vender-inmueble.component.css']
})
export class VenderInmuebleComponent implements OnInit {

  public razonesventa       :parametrizacion[]=[];
  public listTipoInmueble   :concepto[]=[];
  public listDocumento      :concepto[]=[];
  public tipoMoneda         :parametrizacion[]=[];
  public lat                : number = Number(sessionStorage.getItem("latAddUsuario"));
  public lng                : number = Number(sessionStorage.getItem("longddUsuario"));
  public zoon               : number;
  public mapTypeId          : string;
  public listDepartamentos  : Departamento[]=[];
  public listProvincias     : Provincia[]=[];
  public listDistritos      : Distrito[]=[];
  public checksi            = false;
  public checkno            = false;
  public listArchivos       : any = [];
  public nombreArchivos     : string="";
  public listNombresArchivos:any = [];
  parametroCaracteristica   :parametro[] = [];
  parametroServico          :parametro[] = [];
  parametroC                :parametro= new parametro();
  


  marcadores: Marcador[] = [];
  marcador:Marcador = new Marcador(0,0);
  //lat = Number(sessionStorage.getItem("latAddUsuario"));
//  lng = Number(sessionStorage.getItem("longddUsuario"));
  descripcion = JSON.parse(JSON.stringify(sessionStorage.getItem("direccionAddUsuario")));
  nuevaDescripcion :any="";

  constructor(private UserService: UserService,private service: UbicacionService,private parametroService: ParametroService,private serviceUbigeo: UbigeoService) {
    this.service.listarUbicacionActual();
    this.lat= Number(sessionStorage.getItem("latAddUsuario"));
     this.lng = Number(sessionStorage.getItem("longddUsuario"));
     const nuevoMarcador = new Marcador(Number(sessionStorage.getItem("latAddUsuario")),Number(sessionStorage.getItem("longddUsuario")));
      this.marcadores.push(nuevoMarcador);
    this.zoon = 16;
    this.mapTypeId = 'hybrid'
    // this.razonesventa = [
    //   {id:1,descripcion:"Asesoría y acompañamiento en los trámites"},
    //   {id:2,descripcion:"Asesoría y acompañamiento en los trámites"},
    //   {id:3,descripcion:"Asesoría y acompañamiento en los trámites"}
    // ]
    // this.listTipoInmueble = [
    //   {id:1,descripcion:"Casa"},
    //   {id:2,descripcion:"Departamento"},
    //   {id:3,descripcion:"Terreno"},
    //   {id:4,descripcion:"Local"},
    // ]
    // this.listDocumento= [
    //   {id:constante.TIPO_RUC,descripcion:constante.TIPO_RUC_STRING},
    //   {id:constante.TIPO_CARNET_EXTRANJERIA,descripcion:constante.TIPO_CARNET_EXTRANJERIA_STRING},
    //   {id:constante.TIPO_RUC,descripcion:constante.TIPO_RUC_STRING}
    // ]
    this.tipoMoneda = [
      {id:1,descripcion:"SOLES"},
      {id:2,descripcion:"DOLARES"}
    ]
  }

  ngOnInit(): void {
    this.consultarTipoDocumento();
    this.consultarTipoInmueble();
    this.consultarRegion();
    this.listarParametrosCaracteristicas();
    this.listarParametrosServicio();
  }

  agregarMarcador(evento:any){
    this.borrarMarcador(0);
    //this.descripcion=JSON.parse(JSON.stringify(sessionStorage.getItem("direccionAddUsuario")));
    const coords: {lat:number,lng:number} = evento.coords;
    const nuevoMarcador = new Marcador( coords.lat,coords.lng);
    this.marcadores.push(nuevoMarcador);

    sessionStorage.setItem("latAddUsuario",JSON.parse(JSON.stringify(coords.lat)));
    sessionStorage.setItem("longddUsuario",JSON.parse(JSON.stringify(coords.lng)));
    //sessionStorage.setItem("direccionAddUsuario",JSON.parse(JSON.stringify(sessionStorage.getItem("direccionAddUsuario"))));

    //sessionStorage.setItem("direccionAddUsuario",this.descripcion);
    //this.descripcion=JSON.parse(JSON.stringify(sessionStorage.getItem("direccionAddUsuario")));
    this.service.listarUbicacionActualEditar();
    this.descripcion = JSON.parse(JSON.stringify(sessionStorage.getItem("direccionAddUsuario")));
    //this.guardarStorage();

    //console.log(evento)
  }
  borrarMarcador(i:number){
    //console.log(i);
    this.marcadores.splice(i,1);
    this.guardarStorage();
  }
  guardarStorage(){
    sessionStorage.setItem('marcadores',JSON.stringify(this.marcadores));
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
  consultarTipoDocumento() {
    let prefijo = 1;
    this.parametroService.getConcepto(prefijo)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
      this.listDocumento = response.cursor;
    })
  }
  consultarRegion() {
    this.serviceUbigeo.getDepartamento()
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
     this.listDepartamentos = response.cursor;
    })
  }
  consultarProvincia(idDepartamento:number) {
    this.serviceUbigeo.getProvincia(idDepartamento)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
     this.listProvincias = response.cursor;
    })
  }
  consultarDistrito(idProvincia:number) {
    this.serviceUbigeo.getDistrito(idProvincia)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
     this.listDistritos = response.cursor;
    })
  }
  onChangeDepartamento(event:any) {
    let idDepartamento = event.value;
    this.serviceUbigeo.getProvincia(idDepartamento)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
     this.listProvincias = response.cursor;
    })
  }
  onChangeProvincia(event:any){
    let idProvincia = event.value;
    this.serviceUbigeo.getDistrito(idProvincia)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
     this.listDistritos = response.cursor;
    })

  }
  onClickCheckSi():void{
    if (this.checksi = true){this.checkno = false;}
  }

  onClickCheckNo():void{
    if (this.checkno = true){this.checksi = false;}
  }

  subirArchivos(event:any):void {
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
  }

  listarParametrosCaracteristicas(){
    let para_caracteristica =  11;
    this.parametroService.listarParametrosCaracteristicas(para_caracteristica).subscribe(data =>{
      this.parametroCaracteristica = data.cursor;
      console.log("nuevos parametros", this.parametroCaracteristica);
    }) 
  }

  listarParametrosServicio(){
    let para_caracteristica =  12;
    this.parametroService.listarParametrosCaracteristicas(para_caracteristica).subscribe(data =>{
      this.parametroServico = data.cursor;
      console.log("nuevos parametros servicio", this.parametroServico);
    }) 
  }

  publicar(){
    console.log(this.parametroCaracteristica);
    for (let index = 0; index < this.parametroCaracteristica.length; index++) {
      var numero    =0;
      var element   = <HTMLInputElement> document.getElementById("checkCaracteristica"+String(this.parametroCaracteristica[index]["para_id"]));
      var isChecked = element.checked;
      console.log(isChecked);
      if(isChecked == true){
        numero = 1;
      }
      this.parametroCaracteristica[index]["para_marcado"] =  numero;
    }
    console.log("parametros general",this.parametroCaracteristica)
    for (let index = 0; index < this.parametroServico.length; index++) {
      var numero_s    =0;
      var element_s   = <HTMLInputElement> document.getElementById("checkServicio"+String(this.parametroServico[index]["para_id"]));
      var isChecked_s = element_s.checked;
      if(isChecked_s == true){
        numero_s = 1;
      }
      this.parametroServico[index]["para_marcado"] =  numero_s;
    }
    console.log("servicios general",this.parametroServico)
  }


}
