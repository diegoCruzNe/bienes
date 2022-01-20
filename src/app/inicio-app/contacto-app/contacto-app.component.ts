import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Marcador } from 'src/app/Clases/Marcador';
import { ImagenesService } from 'src/app/Service/imagenes.service';
import { UbicacionService } from 'src/app/Service/ubicacion.service';


@Component({
  selector: 'app-contacto-app',
  templateUrl: './contacto-app.component.html',
  styleUrls: ['./contacto-app.component.css']
})
export class ContactoAppComponent implements OnInit {
  public lat: number = 0;
  public lng: number = 0;
  public zoon: number;
  public mapTypeId: string;
  public imgWebContacto:any;
  //marcadores: Marcador[] = [];
    //Para el mapa
    marcadores: Marcador[] = [];
    marcador:Marcador = new Marcador(0,0);
    //lat = Number(sessionStorage.getItem("latAddUsuario"));
  //  lng = Number(sessionStorage.getItem("longddUsuario"));
    descripcion = JSON.parse(JSON.stringify(sessionStorage.getItem("direccionAddUsuario")));
    nuevaDescripcion :any="";
    public imagen_principal:any;
    public ruta_imagen:any;
    public imagen_completa: any;

  constructor(private router: Router,private imagenService: ImagenesService,private service: UbicacionService) {
  //  this.lat = -6.8295714; -6.8236016
  //  this.lng = -79.8006742;  -79.7960414
     this.zoon = 16;
   this.mapTypeId = 'hybrid'
   }

  ngOnInit(): void {
  this.service.listarUbicacionActual();
  this.lat= Number(sessionStorage.getItem("latAddUsuario"));
   this.lng = Number(sessionStorage.getItem("longddUsuario"));
   const nuevoMarcador = new Marcador(Number(sessionStorage.getItem("latAddUsuario")),Number(sessionStorage.getItem("longddUsuario")));
    this.marcadores.push(nuevoMarcador);

    this.ruta_imagen = this.imagenService.CONSULTAR_IMAGEN;
    this.imagen_principal = "2561";
    this.imagen_completa = 'url('+this.ruta_imagen+this.imagen_principal+')';

  }



  facebook():void {
  this.router.navigate(["/contacto"]).then(result=>{window.open('https://www.facebook.com/tucasaahoraperu/')});

  }
  instagram():void {
    this.router.navigate(["/contacto"]).then(result=>{window.open('https://www.instagram.com/tucasa.ahoraperu/')});

  }
  whatsapp():void {
    this.router.navigate(["/contacto"]).then(result=>{window.open('https://api.whatsapp.com/send/?phone=51981419392&text&app_absent=0')});

  }
  consultarLogoPrincipalWeb01() {
    let codigo = 2561;
    this.imagenService.getImagen(codigo)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response:any) => {
      this.createImageFromBlobWeb1(response);
    })
  }
  createImageFromBlobWeb1(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imgWebContacto = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
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

}
