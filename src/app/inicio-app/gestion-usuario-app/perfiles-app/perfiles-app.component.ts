import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../Service/service.service';
import { Router } from '@angular/router';
import { BUTTONS_SISTEMA } from '../../configuracion-general/buttons_sistema';

@Component({
  selector: 'app-perfiles-app',
  templateUrl: './perfiles-app.component.html',
  styleUrls: ['./perfiles-app.component.css']
})
export class PerfilesAppComponent implements OnInit {

  dtOptions: any = {};
  buttons=BUTTONS_SISTEMA;
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.listarTabla();
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

}
