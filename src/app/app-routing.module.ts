import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal/principal.component';
import { ErrorComponent } from './principal/error/error.component';
import { InicioAppComponent } from './inicio-app/inicio-app.component';
import { HomeComponent } from './inicio-app/home/home.component';
import { PortalWebAppComponent } from './inicio-app/config-sistema-app/portal-web-app.component';
import { GestionUsuarioAppComponent } from './inicio-app/gestion-usuario-app/gestion-usuario-app.component';
import { ConfigSistemaAppComponent } from './inicio-app/config-sistema-app/config-sistema-app.component';
import { AgregarUsuarioAppComponent } from './inicio-app/gestion-usuario-app/agregar-usuario-app/agregar-usuario-app.component';
import { PerfilesAppComponent } from './inicio-app/gestion-usuario-app/perfiles-app/perfiles-app.component';
import { ContactoAppComponent } from './inicio-app/contacto-app/contacto-app.component';
import { AsesoriaLegalAppComponent } from './inicio-app/asesoria-legal-app/asesoria-legal-app.component';
import { VenderInmuebleComponent } from './inicio-app/vender-inmueble/vender-inmueble.component';
import { ConstruirInmuebleComponent } from './inicio-app/construir-inmueble/construir-inmueble.component';
import { DetalleCatalogoAppComponent } from './inicio-app/detalle-catalogo-app/detalle-catalogo-app.component';

const routes: Routes = [
  {
    path:'inicio-app',
    component:InicioAppComponent,
    children:[
      {path:'home',component:HomeComponent},
      {path:'config-sistema/portal-web',component:PortalWebAppComponent},
      {path:'gestion-usuario/usuario',component:GestionUsuarioAppComponent},
      {path:'gestion-usuario/add-usuario',component:AgregarUsuarioAppComponent},
      {path:'gestion-usuario/perfiles',component:PerfilesAppComponent},
      {path:'configuracion-sistema',component:ConfigSistemaAppComponent}
    ]
  },
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'',component:InicioAppComponent},
      {path:'asesorialegal',component:AsesoriaLegalAppComponent},
      {path:'contacto',component:ContactoAppComponent},
      {path:'vender-inmueble',component:VenderInmuebleComponent},
      {path:'construir-inmueble',component:ConstruirInmuebleComponent},
      {path:'detalle-catalogo',component:DetalleCatalogoAppComponent},
      {path:'config-sistema/portal-web',component:PortalWebAppComponent},
      {path:'gestion-usuario/usuario',component:GestionUsuarioAppComponent},
      {path:'gestion-usuario/add-usuario',component:AgregarUsuarioAppComponent},
      {path:'gestion-usuario/perfiles',component:PerfilesAppComponent},
      {path:'configuracion-sistema',component:ConfigSistemaAppComponent}
    ]
  },
/*   {path:'asesorialegal',component:AsesoriaLegalAppComponent},
  {path:'contacto',component:ContactoAppComponent},
  {path:'vender-inmueble',component:VenderInmuebleComponent},
  {path:'construir-inmueble',component:ConstruirInmuebleComponent},
  {path:'detalle-catalogo',component:DetalleCatalogoAppComponent},
  {path:'',component:HomeComponent}, */
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
