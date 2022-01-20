import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesService } from '../Service/imagenes.service';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginaService } from '../Service/pagina.service';
import { constante } from 'src/app/Clases/constante';
import { concepto, parametrizacion } from 'src/app/interfaces/parametro';
import { ParametroService } from '../Service/parametro.service';
import { CatalogoService } from '../Service/catalogo.service';
import { filtrocatalogo, listCatalogo } from '../interfaces/catalogo';
import { Router } from '@angular/router';
import { UbigeoService } from '../Service/ubigeo.service';
import { Departamento, Provincia, Distrito } from '../Clases/ubigeo';
import { ServiceService } from '../Service/service.service';
interface Inmobiliaria {
  imagen?: string;
  ciudad?: string;
  precio?: string;
  area?: number;
  dormitorio?: number;
  banio?: number;
  direccion?: string;
}
const datosInmobiliaria: Inmobiliaria[] = [
  {
    imagen: '',
    ciudad: 'LIMA CERCADO',
    precio: '373, 800',
    area: 50,
    dormitorio:1,
    banio:1,
    direccion: 'Av Nicolás de Piérola N° 617 - Lima'
  },
  {
    imagen: '',
    ciudad: 'SAN ISIDRO',
    precio: '187, 500',
    area: 30,
    dormitorio:2,
    banio:1,
    direccion: 'Miguel Dasso 100 - San Isidro'
  },
  {
    imagen: '',
    ciudad: 'COMAS',
    precio: '450, 300',
    area: 30,
    dormitorio:1,
    banio:2,
    direccion: 'Av. Túpac Amaru Km. 7.5 - Comas'
  },
  {
    imagen: '',
    ciudad: 'MAGDALENA',
    precio: '650, 500',
    area: 120,
    dormitorio:4,
    banio:3,
    direccion: 'Jr. Faustino Sánchez Carrión 417 - Magdalena'
  },
  {
    imagen: '',
    ciudad: 'SURQUILLO',
    precio: '650, 500',
    area: 120,
    dormitorio:4,
    banio:3,
    direccion: 'Miguel Dasso 100 - San Isidro'
  },
  {
    imagen: '',
    ciudad: 'COMAS',
    precio: '150, 500',
    area: 100,
    dormitorio:4,
    banio:3,
    direccion: 'Av. Túpac Amaru Km. 7.5 - Comas'
  },
  {
    imagen: '',
    ciudad: 'SURQUILLO',
    precio: '650, 500',
    area: 120,
    dormitorio:4,
    banio:3,
    direccion: 'Miguel Dasso 100 - San Isidro'
  },
  {
    imagen: '',
    ciudad: 'CHICLAYO',
    precio: '650, 500',
    area: 120,
    dormitorio:4,
    banio:3,
    direccion: 'Calle Grau 125'
  },
  {
    imagen: '',
    ciudad: 'PIURA',
    precio: '650, 500',
    area: 120,
    dormitorio:4,
    banio:3,
    direccion: 'Calle Grau 125'
  },
  {
    imagen: '',
    ciudad: 'TUMBES',
    precio: '650, 500',
    area: 120,
    dormitorio:4,
    banio:3,
    direccion: 'Calle Grau 125'
  },
  {
    imagen: '',
    ciudad: 'LAMBAYEQUE',
    precio: '650, 500',
    area: 120,
    dormitorio:4,
    banio:3,
    direccion: 'Calle Grau 125'
  },
  {
    imagen: '',
    ciudad: 'MONSEFU',
    precio: '650, 500',
    area: 120,
    dormitorio:1,
    banio:3,
    direccion: 'Calle Grau 125'
  },
  {
    imagen: '',
    ciudad: 'CHIMBOTE',
    precio: '650, 500',
    area: 120,
    dormitorio:1,
    banio:3,
    direccion: 'Calle Grau 125 - Chimbote'
  },
  {
    imagen: '',
    ciudad: 'PUNO',
    precio: '650, 500',
    area: 120,
    dormitorio:1,
    banio:3,
    direccion: 'Calle Grau 125 - Puno'
  },
  {
    imagen: '',
    ciudad: 'TRUJILLO',
    precio: '650, 500',
    area: 120,
    dormitorio:1,
    banio:3,
    direccion: 'Calle Grau 125 - Trujillo'
  },
  {
    imagen: '',
    ciudad: 'CAJAMARCA',
    precio: '650, 500',
    area: 120,
    dormitorio:1,
    banio:3,
    direccion: 'Calle Grau 125 - Cajamarca'
  },
  {
    imagen: '',
    ciudad: 'MADRE DE DIOS',
    precio: '650, 500',
    area: 120,
    dormitorio:1,
    banio:3,
    direccion: 'Calle Grau 125 - Madre de Dios'
  },
  {
    imagen: '',
    ciudad: 'LA LIBERTAD',
    precio: '650, 500',
    area: 120,
    dormitorio:1,
    banio:3,
    direccion: 'Calle Grau 125 - La libertad'
  },
  {
    imagen: '',
    ciudad: 'AREQUIPA',
    precio: '650, 500',
    area: 120,
    dormitorio:1,
    banio:3,
    direccion: 'Calle Grau 125 - Arequipa'
  }
]

interface Country {
  id?       : number;
  name      : string;
  flag      : string;
  area      : number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'France',
    flag: 'c/c3/Flag_of_France.svg',
    area: 640679,
    population: 64979548
  },
  {
    name: 'Germany',
    flag: 'b/ba/Flag_of_Germany.svg',
    area: 357114,
    population: 82114224
  },
  {
    name: 'Portugal',
    flag: '5/5c/Flag_of_Portugal.svg',
    area: 92090,
    population: 10329506
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'Vietnam',
    flag: '2/21/Flag_of_Vietnam.svg',
    area: 331212,
    population: 95540800
  },
  {
    name: 'Brazil',
    flag: '0/05/Flag_of_Brazil.svg',
    area: 8515767,
    population: 209288278
  },
  {
    name: 'Mexico',
    flag: 'f/fc/Flag_of_Mexico.svg',
    area: 1964375,
    population: 129163276
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'India',
    flag: '4/41/Flag_of_India.svg',
    area: 3287263,
    population: 1324171354
  },
  {
    name: 'Indonesia',
    flag: '9/9f/Flag_of_Indonesia.svg',
    area: 1910931,
    population: 263991379
  },
  {
    name: 'Tuvalu',
    flag: '3/38/Flag_of_Tuvalu.svg',
    area: 26,
    population: 11097
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];


@Component({
  selector: 'app-inicio-app',
  templateUrl: './inicio-app.component.html',
  styleUrls: ['./inicio-app.component.css']
})
export class InicioAppComponent implements OnInit {

  public imagen?: Blob;
  public imgWeb01:any;
  public imgWeb02:any;
  public imgWeb03:any;
  hidden_imagen_uno=false;
  hidden_imagen_dos=true;
  hidden_imagen_tres=true;
  page = 1;
  pageSize = 4;
  countries: Country[]=[];
  public listTipoInmueble:concepto[]=[];
  public allItems: any[]=datosInmobiliaria;
  // pager object
  public pager: any = {};
  // paged items
  public pagedItems: any[] = [];
  public dormitorio:string = constante.DORMITORIO;
  public dormitorios:string = constante.DORMITORIOS;
  public listCatalogo: listCatalogo[] = [];
  public listDepartamentos: Departamento[]=[];
  public listProvincias: Provincia[]=[];
  public listDistritos: Distrito[]=[];
  public idregion: string='0';
  public idciudad: string='0';
  public iddistrito: string = '0';
  public idtipoinmueble:string ='0';
  public nrohabitaciones:number= 0;
  public nrobanios:number=0;
  public preciomin:string='';
  public preciomax:string='';
  public filtroCatalogo: filtrocatalogo ={};
  public imagen_principal:any;
  public ruta_imagen:any;
  public imagen_completa: any;
  activars=false;
  constructor(private spinnerService: NgxSpinnerService,private imagenService: ImagenesService,private pagerService: PaginaService,
    private parametroService: ParametroService,private serviceCatalogo: CatalogoService,private route: Router,private serviceUbigeo: UbigeoService ,
    private service: ServiceService) {
    this.refreshCountries();
/*     document.addEventListener("DOMContentLoaded", () => {
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
    }); */
    this.filtroCatalogo  = {
      idregion: '0',
      idciudad : '0',
      iddistrito: '0',
      idtipoinmueble: '0'
    }
  }

  ngOnInit(): void { 
    this.spinner();
    this.consultarLogoPrincipalWeb01();
    this.consultarLogoPrincipalWeb02();
    this.consultarLogoPrincipalWeb03();
    this.setPage(1);
    this.consultarListaCatalgo();
    this.consultarRegion();
    this.consultarTipoInmueble();
    this.ruta_imagen = this.imagenService.CONSULTAR_IMAGEN;
    this.imagen_principal = "2781";
    this.imagen_completa = 'url('+this.ruta_imagen+this.imagen_principal+')';

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

    this.hidden_imagen_uno=false;
/*     this.hidden_imagen_dos=true;
    this.hidden_imagen_tres=true;

    let segundo = <HTMLElement> document.getElementById('segundo-imagen');
    let tercero = <HTMLElement> document.getElementById('tercer-imagen');
    let primero = <HTMLElement> document.getElementById('primer-imagen');
    setTimeout(()=>{
      segundo.click();
    },6000);
    setTimeout(()=>{
      tercero.click();
    },12000);
    setTimeout(()=>{
      primero.click();
      this.presionar();
    },18000);
 */
  }

  refreshCountries() {
    this.countries = COUNTRIES
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  presionar(){
    let segundo = <HTMLElement> document.getElementById('segundo-imagen');
    let tercero = <HTMLElement> document.getElementById('tercer-imagen');
    let primero = <HTMLElement> document.getElementById('primer-imagen');
    setTimeout(()=>{
      segundo.click();
    },6000);
    setTimeout(()=>{
      tercero.click();
    },12000);
    setTimeout(()=>{
      primero.click();
    },18000);
  }

  spinner():void{
    this.spinnerService.show();
    setTimeout(()=>{
      this.spinnerService.hide();
    },2000);
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

  consultarLogoPrincipalWeb01() {
    let codigo = 521;
    this.imagenService.getImagen(codigo)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response:any) => {
      this.createImageFromBlobWeb1(response);
    })
  }
  consultarLogoPrincipalWeb02() {
    let codigo = 2671;
    this.imagenService.getImagen(codigo)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response:any) => {
      console.log(response);
      this.createImageFromBlobWeb2(response);
    })
  }
  consultarLogoPrincipalWeb03() {
    let codigo = 2781;
    this.imagenService.getImagen(codigo)
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response:any) => {
      console.log(response);
      this.createImageFromBlobWeb3(response);
    })
  }
  createImageFromBlobWeb1(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imgWeb01 = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
    }
  createImageFromBlobWeb2(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imgWeb02 = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  createImageFromBlobWeb3(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imgWeb03 = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
  consultarListaCatalgo() {
    this.serviceCatalogo.getCatalogo()
    .pipe(
      catchError((error) => {
                  return EMPTY;
                })
    ).subscribe((response) => {
      this.listCatalogo = response.cursor;
    })
  }
  verDetalleCatalgo() {
    this.route.navigate(['/detalle-catalogo']);
    this.service.scrool_focus_superior();

  }
  consultarRegion() {
    this.serviceUbigeo.getDepartamento()
    .pipe(catchError((error) => {
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

  enviarFiltro():void{
    console.log(this.filtroCatalogo);

  }
}
