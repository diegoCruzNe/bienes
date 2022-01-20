import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicegoogleService {

  constructor(private http:HttpClient) { }
  
  listar(){
    const lat = -6.7723514;
    const long = -79.8540947;
    const TU_LLAVE = 'AIzaSyD0xbF2frQ-_OwurNxnIUr3_EBJdnfBTBM';
    return this.http.get<{status: string, results: any[]}>(
         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${TU_LLAVE}`,
          {responseType: 'json'},
        ).subscribe(e => {
          if (e.status === 'OK') {
            //console.log(e.results[0].formatted_address);
          }
        });
  }

  listarUbicacion(){
    let map: google.maps.Map, infoWindow: google.maps.InfoWindow;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          //console.log(pos)
          //infoWindow.setPosition(pos);
          //infoWindow.setContent("Location found.");
          //infoWindow.open(map);
          //map.setCenter(pos);
        },
        () => {
        }
      );
      
    } else {
      // Browser doesn't support Geolocation
    }
  }

  listarUbicacionActual(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          //console.log(pos)
          sessionStorage.setItem("latAddUsuario",JSON.parse(JSON.stringify(position.coords.latitude)));
          sessionStorage.setItem("longddUsuario",JSON.parse(JSON.stringify(position.coords.longitude)));
          localStorage.setItem("latAddUsuario_prueba",JSON.parse(JSON.stringify(position.coords.latitude)));
          localStorage.setItem("longddUsuario_prueba",JSON.parse(JSON.stringify(position.coords.longitude)));
          //infoWindow.setPosition(pos);
          //infoWindow.setContent("Location found.");
          //infoWindow.open(map);
          //map.setCenter(pos);
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const TU_LLAVE = 'AIzaSyD0xbF2frQ-_OwurNxnIUr3_EBJdnfBTBM';
          return this.http.get<{status: string, results: any[]}>(
               `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${TU_LLAVE}`,
                {responseType: 'json'}
              ).subscribe(e => {
                if (e.status === 'OK') {
                  //console.log(e.results[0].formatted_address);
                  sessionStorage.setItem("direccionAddUsuario",JSON.parse(JSON.stringify(e.results[0].formatted_address)));
                  localStorage.setItem("direccionAddUsuarioPrueba",JSON.parse(JSON.stringify(e.results[0].formatted_address)));
                }
              });
        },
        () => {
        }
      );
      
    } else {
      // Browser doesn't support Geolocation
    }
  }

  listarUbicacionActualEditar(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat:  position.coords.latitude,
            lng: position.coords.longitude,
          };
          //console.log(pos)
          //sessionStorage.setItem("latAddUsuario",JSON.parse(JSON.stringify(position.coords.latitude)));
          //sessionStorage.setItem("longddUsuario",JSON.parse(JSON.stringify(position.coords.longitude)));
          //infoWindow.setPosition(pos);
          //infoWindow.setContent("Location found.");
          //infoWindow.open(map);
          //map.setCenter(pos);
          const lat =  Number(sessionStorage.getItem("latAddUsuario"));
          const long =Number(sessionStorage.getItem("longddUsuario"));
          const TU_LLAVE = 'AIzaSyD0xbF2frQ-_OwurNxnIUr3_EBJdnfBTBM';
          return this.http.get<{status: string, results: any[]}>(
               `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${TU_LLAVE}`,
                {responseType: 'json'}
              ).subscribe(e => {
                if (e.status === 'OK') {
                  //console.log(e.results[0].formatted_address);
                  sessionStorage.setItem("direccionAddUsuario",JSON.parse(JSON.stringify(e.results[0].formatted_address)));
                }
              });
        },
        () => {
        }
      );
      
    } else {
      // Browser doesn't support Geolocation
    }
  }

}
