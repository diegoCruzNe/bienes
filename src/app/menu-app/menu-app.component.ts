import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-app',
  templateUrl: './menu-app.component.html',
  styleUrls: ['./menu-app.component.css']
})
export class MenuAppComponent implements OnInit {

  constructor(private router:Router) {

   }

  ngOnInit(): void {

    let listElements = document.querySelectorAll('.list__button--click');
    listElements.forEach(listElement => {
        listElement.addEventListener('click', ()=>{
            
            listElement.classList.toggle('arrow');
  
            let height = 0;
            let menu = listElement.nextElementSibling as HTMLBodyElement

            if(menu != null){
              if(menu.clientHeight ==  0){
                height=menu.scrollHeight;
              }
              console.log(height);
              menu.style.height = `${height}px`;
            }
        })
    });

  }

  presionar(){

  }

  ingresarInicio(){
    this.router.navigate(["inicio-app/home"]);
  }

  cerrarMenu(){
    let cerrar = <HTMLButtonElement> document.getElementById("cerrar_menu");
    cerrar.click();
  }

}
