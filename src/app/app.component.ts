import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService} from './Service/service.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  modalWindow = null;
  version_app='';
  version_data={"mensaje":""};
  constructor(private router:Router, private service:ServiceService, private spinnerService: NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner();
  }
  title = 'sistema-servicios-generales';

  spinner():void{
    this.spinnerService.show();
    setTimeout(()=>{
      this.spinnerService.hide();
    },2000);
  }




}
