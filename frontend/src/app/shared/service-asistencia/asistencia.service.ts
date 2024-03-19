import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsistenciaListaModel } from './asistencia.model';
import { AsistenciaModel } from './asistencia.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  BASE_URL = "https://gsa-api.onrender.com"
  // BASE_URL = "http://localhost:9300"

  constructor(private http: HttpClient) { }

  validarExistenciaAsistencias() {
    return this.http.get<string>(this.BASE_URL+'/validacion_existencia_asistencias')
  }

  obtenerAsistencias() {
    return this.http.get<AsistenciaListaModel[]>(this.BASE_URL+'/asistencia_listado');
  }

  obtenerAsistencia(id_registro_asis: string) {
    return this.http.get<AsistenciaModel[]>(`${this.BASE_URL}/asistencia_listado/${id_registro_asis}`)
  }

  validarAprendiz(fk_id_aprend_asis: string) {
    return this.http.get<string>(`${this.BASE_URL}/asistencia_listado_aprend/${fk_id_aprend_asis}`)
  }

  validarExistenciaAsistenciasId(fk_id_aprend_asis: string) {
    return this.http.get<string>(`${this.BASE_URL}/validacion_existencia_asistencias_id/${fk_id_aprend_asis}`)
  }

  validarExistenciaAsistenciasFecha(fecha_asis: string) {
    return this.http.get<string>(`${this.BASE_URL}/validacion_existencia_asistencias_fecha/${fecha_asis}`)
  }

  agregarAsistencia(asistencia: AsistenciaModel) {
    return this.http.post<string>(`${this.BASE_URL}/asistencia_agregar`, asistencia);
  }

  actualizarAsistencia(asistencia: AsistenciaModel) {
    return this.http.put<string>(`${this.BASE_URL}/asistencia_edicion/${asistencia.id_registro_asis}`, asistencia)
  }

  eliminarAsistencia(id_registro_asis: string) {
    return this.http.delete<string>(`${this.BASE_URL}/asistencia_eliminacion/${id_registro_asis}`)
  }

  obtenerReporteGeneralAsistencias() {
    return this.http.get(this.BASE_URL+'/asistencia_reporte', {observe: 'response', responseType: 'blob'})
  }

  obtenerReporteEspecificoAsistenciaId(id_user: string) {
    return this.http.get(this.BASE_URL+`/asistencia_reporte_id/${id_user}`, {observe: 'response', responseType: 'blob'})
  }

  obtenerReporteEspecificoAsistenciaFecha(fecha_asis: string) {
    return this.http.get(this.BASE_URL+`/asistencia_reporte_fecha/${fecha_asis}`, {observe: 'response', responseType: 'blob'})
  }

  filterListadoAsistenciasIdInstructor(id_instruc_asis: string) {
    return this.http.get<AsistenciaListaModel[]>(`${this.BASE_URL}/asistencia_listado_filtrado_id_instructor/${id_instruc_asis}`)
  }

  filterListadoAsistenciasIdAprendiz(fk_id_aprend_asis: string) {
    return this.http.get<AsistenciaListaModel[]>(`${this.BASE_URL}/asistencia_listado_filtrado_id_aprendiz/${fk_id_aprend_asis}`)
  }

  filterListadoAsistenciasNombre1(nom1_user: string) {
    return this.http.get<AsistenciaListaModel[]>(`${this.BASE_URL}/asistencia_listado_filtrado_nombre1/${nom1_user}`)
  }

  filterListadoAsistenciasNombres(asistencia: AsistenciaListaModel) {
    return this.http.post<AsistenciaListaModel[]>(`${this.BASE_URL}/asistencia_listado_filtrado_nombres`, asistencia)
  }

  filterListadoAsistenciasFecha(fecha_asis: string) {
    return this.http.get<AsistenciaListaModel[]>(`${this.BASE_URL}/asistencia_listado_filtrado_fecha/${fecha_asis}`)
  }
}
