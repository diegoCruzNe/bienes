import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceService } from './Service/service.service';
import { PrincipalComponent } from './principal/principal/principal.component';
import { AgmCoreModule } from '@agm/core';
import { ErrorComponent } from './principal/error/error.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from "angular-datatables";
import { SidebarModule } from 'ng-sidebar';
//MODULOS PARA ENVIO DE SESION CON REDES SOSCIALES
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { InterceptorService } from './Service/interceptor.service';
import { InicioAppComponent } from './inicio-app/inicio-app.component';
import { MenuAppComponent } from './menu-app/menu-app.component';
import { HeaderAppComponent } from './header-app/header-app.component';
import { HomeComponent } from './inicio-app/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConfigSistemaAppComponent } from './inicio-app/config-sistema-app/config-sistema-app.component';
import { PortalWebAppComponent } from './inicio-app/config-sistema-app/portal-web-app.component';
import { GestionUsuarioAppComponent } from './inicio-app/gestion-usuario-app/gestion-usuario-app.component';
import {MatIconModule} from '@angular/material/icon';
import { AgregarUsuarioAppComponent } from './inicio-app/gestion-usuario-app/agregar-usuario-app/agregar-usuario-app.component';
import { PerfilesAppComponent } from './inicio-app/gestion-usuario-app/perfiles-app/perfiles-app.component';
import { TestimoniosAppComponent } from './inicio-app/testimonios-app/testimonios-app.component';
import { FooterAppComponent } from './footer-app/footer-app.component';
import { ContactoAppComponent } from './inicio-app/contacto-app/contacto-app.component';
import { AsesoriaLegalAppComponent } from './inicio-app/asesoria-legal-app/asesoria-legal-app.component';
import { VenderInmuebleComponent } from './inicio-app/vender-inmueble/vender-inmueble.component';
import { ConstruirInmuebleComponent } from './inicio-app/construir-inmueble/construir-inmueble.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalleCatalogoAppComponent } from './inicio-app/detalle-catalogo-app/detalle-catalogo-app.component';



let config = new AuthServiceConfig([
  /* {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("CREDNCIALES")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1655640827978346")
  } */
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    ErrorComponent,
    InicioAppComponent,
    MenuAppComponent,
    HeaderAppComponent,
    HomeComponent,
    ConfigSistemaAppComponent,
    PortalWebAppComponent,
    GestionUsuarioAppComponent,
    AgregarUsuarioAppComponent,
    PerfilesAppComponent,
    TestimoniosAppComponent,
    FooterAppComponent,
    AsesoriaLegalAppComponent,
    ContactoAppComponent,
    AsesoriaLegalAppComponent,
    VenderInmuebleComponent,
    ConstruirInmuebleComponent,
    DetalleCatalogoAppComponent

  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    DataTablesModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    DataTablesModule,
    SidebarModule.forRoot(),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9Jz9rr_lkDDXHMytocT3oZhrkMMlF-OM'
    }),
    ServiceWorkerModule.register('sw.js', { enabled: environment.production }),
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No ', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
    SocialLoginModule,
    NgbModule
  ],
  providers: [ServiceService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    }/* ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    } */],
  bootstrap: [AppComponent],
})
export class AppModule { }
