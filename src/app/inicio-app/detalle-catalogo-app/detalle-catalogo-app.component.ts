import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-datatable';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { imagenes } from 'src/app/interfaces/catalogo';
import { concepto } from 'src/app/interfaces/parametro';
import { PaginaService } from 'src/app/Service/pagina.service';
import { ParametroService } from 'src/app/Service/parametro.service';
import { ServiceService } from 'src/app/Service/service.service';

const pageIttems:imagenes[]=[
  {
    id:1,
    flag:0,
    src:'../../../assets/imagen/lista-imagenes/imagen1.jpg'
  },
  {
    id:2,
    flag:0,
    src:'../../../assets/imagen/lista-imagenes/imagen2.jpg'
  },
  {
    id:3,
    flag:0,
    src:'../../../assets/imagen/lista-imagenes/imagen3.jpg'
  },
  {
    id:4,
    flag:0,
    src:'../../../assets/imagen/lista-imagenes/imagen4.jpg'
  }
]

declare const iniciarCarousel : any;

@Component({
  selector: 'app-detalle-catalogo-app',
  templateUrl: './detalle-catalogo-app.component.html',
  styleUrls: ['./detalle-catalogo-app.component.css']
})
export class DetalleCatalogoAppComponent implements OnInit {
  public listDocumento:concepto[]=[];
  public flagimagen:number=0;
  public pager: any = {};
  public listImagenes:imagenes[] = pageIttems
  // paged items
  public pagedItems: any[] = [];
  public imagen_principal = "imagen3.jpg";
  modal:any;
  imagen:any;
  constructor(private parametroService: ParametroService,private router: Router,private pagerService: PaginaService ) { 
    
  }

  ngOnInit(): void {
   // this.flagimagen =1;
    this.setPage(1);
    this.imagenDefecto();
  }

  ngAfterViewInit() { 
    iniciarCarousel();
  }

  
  
  consultarTipoDocumento() {
    let prefijo = 1;
    this.parametroService.getConcepto(prefijo)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
      console.log("datos parametros")
      console.log(response);
      this.listDocumento = response.cursor;
      console.log("lista documentos")
      console.log(this.listDocumento);
    })
  }
  whatsapp():void {
    this.router.navigate(["/detalle-catalogo"]).then(result=>{window.open('https://api.whatsapp.com/send/?phone=51981419392&text&app_absent=0')});

  }
  imagen1(lista:imagenes):void{


    // if(this.listImagenes[0].id =1){
    //   this.listImagenes[i].flag =1;
    // }
    // if(this.listImagenes[i].id =2){
    //   this.listImagenes[i].flag =2;
    // }
    // if(this.listImagenes[i].id =3){
    //   this.listImagenes[i].flag =3;
    // }
    // if(this.listImagenes[i].id =4){
    //   this.listImagenes[i].flag =4;
    // }
    if(lista.id == 1) {
      console.log("uno");
      this.listImagenes[0].flag =1;
      this.listImagenes[1].flag =0;
      this.listImagenes[2].flag =0;
      this.listImagenes[3].flag =0;
    }
    if(lista.id == 2) {
      console.log("dos");
      this.listImagenes[1].flag =2;
      this.listImagenes[0].flag =0;
      this.listImagenes[2].flag =0;
      this.listImagenes[3].flag =0;
    }
    if(lista.id == 3) {
      console.log("tres");
      this.listImagenes[2].flag =3;
      this.listImagenes[0].flag =0;
      this.listImagenes[1].flag =0;
      this.listImagenes[3].flag =0;
    }
    if(lista.id == 4) {
      console.log("cuatro");
      this.listImagenes[3].flag =4;
      this.listImagenes[0].flag =0;
      this.listImagenes[1].flag =0;
      this.listImagenes[2].flag =0;
    }

  }
  imagenDefecto():void{
    this.listImagenes[0].flag =1;
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPagerImagen(4,page);

    // get current page of items
   // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  imagenMostrar(imagen:any){
    this.imagen_principal = imagen;
  }

  abrirFoto(id_image:any){
    this.modal="block";
    let imagen= <HTMLImageElement> document.getElementById(id_image);
    this.imagen=imagen.src;
  }

  cerrar_foto(){
    this.modal="none";
  }

}
