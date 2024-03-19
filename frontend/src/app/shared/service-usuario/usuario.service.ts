import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel, TiposUsuarios, Antecedentes } from './usuario.model';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  BASE_URL = "https://gsa-api.onrender.com"
  // BASE_URL = "http://localhost:9300"

  constructor(private http: HttpClient) { }

  obtenerTiposUsuarios() {
    return this.http.get<TiposUsuarios[]>(this.BASE_URL+'/tipos_usuarios')
  }

  obtenerAntecedentes() {
    return this.http.get<Antecedentes[]>(this.BASE_URL+'/antecedentes')
  }

  validarCorreo(usuario: UsuarioModel) {
    return this.http.post<string>(`${this.BASE_URL}/validar_correo`, usuario)
  }

  validar_rec_contrasena(usuario: UsuarioModel) {
    return this.http.post<string>(`${this.BASE_URL}/validar_rec_contrasena`, usuario)
  }

  actualizarContrasena(usuario: UsuarioModel) {
    return this.http.put<string>(`${this.BASE_URL}/validar_rec_contrasena/${usuario.id_user}`, usuario)
  }

  validarExistenciaUsuarios() {
    return this.http.get<string>(this.BASE_URL+'/validacion_existencia_usuarios')
  }

  obtenerUsuarios() {
    return this.http.get<UsuarioModel[]>(this.BASE_URL+'/usuarios_listado')
  }

  validarExistenciaUsuario(id_user: string) {
    return this.http.get<string>(this.BASE_URL+`/validacion_existencia_usuarios/${id_user}`)
  }

  obtenerUsuario(id_user: string) {
    return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios_listado/${id_user}`)
  }

  agregarUsuario(usuario: UsuarioModel) {
    return this.http.post<string>(`${this.BASE_URL}/registrarse`, usuario)
  }

  iniciarSesion(usuario: UsuarioModel) {
    return this.http.post<string>(`${this.BASE_URL}/iniciar_sesion`, usuario)
  }

  obtenerRol_Id(usuario: UsuarioModel) {
    return this.http.post<string>(`${this.BASE_URL}/get_rol_id`, usuario)
  }

  actualizarUsuario(usuario: UsuarioModel) {
    return this.http.put<string>(`${this.BASE_URL}/usuarios_edicion/${usuario.id_user}`, usuario)
  }

  obtenerReporteGeneralUsuarios() {
    return this.http.get(this.BASE_URL+'/usuarios_reporte', {observe: 'response', responseType: 'blob'})
  }

  obtenerReporteEspecificoUsuario(id_user: string) {
    return this.http.get(this.BASE_URL+`/usuarios_reporte/${id_user}`, {observe: 'response', responseType: 'blob'})
  }

  filterListadoUsuariosId(id_user: string) {
    // this.obtenerUsuario(id_user).pipe(map((usuario: UsuarioModel) => usuario.map(usuario => usuario.address)))
    return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios_listado_filtrado_id/${id_user}`)


    // const direccion = this.BASE_URL+`/usuarios_listado_filtrado/${id_user}`
    // return this.http.get<UsuarioModel[]>(direccion)
    //   .pipe(
    //   map( (res:UsuarioModel[]) => res),
    //   catchError(() => EMPTY)
    //   )
  }

  filterListadoUsuariosNombre1(nom1_user: string) {
    return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios_listado_filtrado_nombre1/${nom1_user}`)
  }

  filterListadoUsuariosNombres(usuario: UsuarioModel) {
    return this.http.post<UsuarioModel[]>(`${this.BASE_URL}/usuarios_listado_filtrado_nombres`, usuario)
  }
  
  filterListadoUsuariosRol(tipo_user: string) {
    return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios_listado_filtrado_rol/${tipo_user}`)
  }
}
