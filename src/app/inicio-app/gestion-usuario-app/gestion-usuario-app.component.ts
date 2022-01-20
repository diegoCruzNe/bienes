import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { BUTTON_APLICACION } from '../../Clases/buttons';
import { BUTTONS_SISTEMA } from '../configuracion-general/buttons_sistema';
import { ServiceService } from '../../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-usuario-app',
  templateUrl: './gestion-usuario-app.component.html',
  styleUrls: ['./gestion-usuario-app.component.css']
})
export class GestionUsuarioAppComponent implements OnInit {

  dtOptions: any = {};
  agregar = BUTTONS_SISTEMA[0]["agregar"];
  ocultar = BUTTONS_SISTEMA[0]["ocultar"];
  button_agregar_cliente ='';
  agregar_cliente_hiddden=true;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.listarTabla();
    this.button_agregar_cliente = this.agregar;
    setTimeout(()=>{
      //this.dtTrigger.next();
    },3000);
  }

  presionar(){
    console.log("si estra el")
  }

  listarTabla(){
    const Responsive = require('datatables.net-responsive');
    this.dtOptions = {
      responsive:{
        responsive:true,
        details: {
            renderer: Responsive.renderer.listHiddenNodes()
        }
      },
      columnDefs: [{ orderable: false, targets: 0 }],
      autoWidth: false,
      pagingType: 'full_numbers',
      pageLength: 10,
      info: true,
      language:{
        processing: "Procesando...",
        search: "",
        /* lengthMenu: "Mostrar _MENU_ elementos", */
        lengthMenu: "_MENU_",
        /* info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos", */
        info: "_TOTAL_ elementos totales",
        infoEmpty: "Ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "NO se encontraron registros",
        paginate: {
          first: "⯬",
          previous: "◄",
          next: "►",
          last: "⯮"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      },
    };
  }

  agregar_cliente(){
    //this.router.navigate(["inicio-app/gestion-usuario/add-usuario"]);
    this.agregar_cliente_hiddden = false;
    this.button_agregar_cliente = this.ocultar;
    
  }

}

