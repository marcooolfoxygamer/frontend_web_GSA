import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioService } from './shared/service-usuario/usuario.service';
import { AnuncioService } from './shared/service-anuncio/anuncio.service';
import { NavbarGeneralComponent } from './shared/navbar-general/navbar-general.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { AnunciosComponent } from './home/anuncios/anuncios.component';
import { RecomendacionesComponent } from './home/recomendaciones/recomendaciones.component';
import { RegistrarseComponent } from './home/registrarse/registrarse.component';
import { IniciarSesionComponent } from './home/iniciar-sesion/iniciar-sesion.component';
import { RecuperacionContrasenaComponent } from './recuperacion-contrasena/recuperacion-contrasena.component';
import { BienvenidaAdminComponent } from './admin/bienvenida-admin/bienvenida-admin.component';
import { AgregarAnuncioComponent } from './admin/anuncios/agregar-anuncio/agregar-anuncio.component';
import { ListarAnuncioComponent } from './admin/anuncios/listar-anuncio/listar-anuncio.component';
import { EditarAnuncioComponent } from './admin/anuncios/editar-anuncio/editar-anuncio.component';
import { ListadoComponent } from './admin/usuarios/listado/listado.component';
import { EdicionComponent } from './admin/usuarios/edicion/edicion.component';
import { BienvenidaAprendizComponent } from './aprendiz/bienvenida-aprendiz/bienvenida-aprendiz.component';
import { PlanificadorComponent } from './aprendiz/planificador/planificador.component';
import { BienvenidaInstructorComponent } from './instructor/bienvenida-instructor/bienvenida-instructor.component';
import { AgregarAsistenciaComponent } from './instructor/asistencia/agregar-asistencia/agregar-asistencia.component';
import { ListarAsistenciaComponent } from './instructor/asistencia/listar-asistencia/listar-asistencia.component';
import { EditarAsistenciaComponent } from './instructor/asistencia/editar-asistencia/editar-asistencia.component';
import { NavbarLogAprendizComponent } from './shared/navbar-log-aprendiz/navbar-log-aprendiz.component';
import { NavbarLogInstructorComponent } from './shared/navbar-log-instructor/navbar-log-instructor.component';
import { NavbarLogAdministradorComponent } from './shared/navbar-log-administrador/navbar-log-administrador.component';
import { NavbarsComponent } from './shared/navbars/navbars.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarGeneralComponent,
    FooterComponent,
    InicioComponent,
    AnunciosComponent,
    RecomendacionesComponent,
    RegistrarseComponent,
    IniciarSesionComponent,
    RecuperacionContrasenaComponent,
    BienvenidaAdminComponent,
    AgregarAnuncioComponent,
    ListarAnuncioComponent,
    EditarAnuncioComponent,
    ListadoComponent,
    EdicionComponent,
    BienvenidaAprendizComponent,
    PlanificadorComponent,
    BienvenidaInstructorComponent,
    AgregarAsistenciaComponent,
    ListarAsistenciaComponent,
    EditarAsistenciaComponent,
    NavbarLogAprendizComponent,
    NavbarLogInstructorComponent,
    NavbarLogAdministradorComponent,
    NavbarsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UsuarioService,
    AnuncioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
