import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { parametro } from '../interfaces/parametro';
import { ImagenesService } from '../Service/imagenes.service';
import { ParametroService } from '../Service/parametro.service';
import { ServiceService } from '../Service/service.service';

declare const menu : any;

@Component({
  selector: 'app-header-app',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.css']
})
export class HeaderAppComponent implements OnInit {
public imagen?: Blob;
public userAvatar:any;
public ruta_imagen:any;
public codigoLogo?:string="";
public objparametro: parametro = new parametro();
  constructor(private imagenService: ImagenesService,private parametroService: ParametroService, private service:ServiceService) {

    document.addEventListener("DOMContentLoaded", () => {
      const header =  <HTMLElement> document.getElementById('header')
      const hamburger = <HTMLElement> document.getElementById('hamburger')
      const main = document.getElementById('main')
      hamburger.onclick = e => {
        if (header.classList.contains('expanded')) {
          header.classList.remove('expanded')
        } else {
          header.classList.add('expanded')
        }
      }

      document.onclick = (e:any) => {
        if (!e.target.closest('#header')) {
          header.classList.remove('expanded')
        }
      }
    });
  }





  ngOnInit(): void {
    this.consultarCodigoLogo();
    this.consultarLogo();
    this.ruta_imagen = this.imagenService.CONSULTAR_IMAGEN;
    this.userAvatar = "lch1";
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function() {
      if (this.matchMedia("(min-width: 768px)").matches) {
        $dropdown.on ("mouseenter",
        function() {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        }
        ) .on ("mouseleave",      function() {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        })
      } else {
        $dropdown.off("mouseenter mouseleave");
      }
    });
  }

  consultarLogo() {
    let codigo = Number(this.codigoLogo);
    this.imagenService.getImagen(codigo)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response:any) => {
      console.log(response);
      this.createImageFromBlob(response);
    })
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.userAvatar = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }
 consultarCodigoLogo() {
  let prefijo = 1;
  this.parametroService.getParametro(prefijo)
  .pipe(
    catchError((error) => {
                return EMPTY;
              })
  ).subscribe((response) => {
    console.log(response);
    this.objparametro = response.cursor;
    this.codigoLogo = this.objparametro.para_cadena2;
  })
}

cerrarMenu(){
  this.presionar();
}

presionar(){
  let presionar = <HTMLButtonElement> document.getElementById('hamburger');
  presionar.click();
}


}
