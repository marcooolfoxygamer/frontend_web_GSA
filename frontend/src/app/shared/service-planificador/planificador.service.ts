import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlanificadorModel, MusculosModel, Ejercicios_MusculosModel } from './planificador.model';

@Injectable({
  providedIn: 'root'
})
export class PlanificadorService {

  BASE_URL = "https://gsa-api.onrender.com"
  // BASE_URL = "http://localhost:9300"

  constructor(private http: HttpClient) { }

  obtenerMusculos() {
    return this.http.get<MusculosModel[]>(this.BASE_URL+'/musculos');
  }

  validarExistenciaRegistrosPlanificador() {
    return this.http.get<string>(this.BASE_URL+'/validacion_existencia_registros_planificador')
  }

  validarExistenciaAprendizPlanificador(id_user: string) {
    return this.http.get<string>(this.BASE_URL+`/validacion_existencia_registros_planificador/${id_user}`)
  }

  agregarPlanificador(planificador: PlanificadorModel) {
    return this.http.post<string>(`${this.BASE_URL}/planificador`, planificador);
  }

  obtenerEjercicios_Musculo(musculo: string) {
    return this.http.get<Ejercicios_MusculosModel[]>(`${this.BASE_URL}/ejercicios_musculo/${musculo}`)
  }

  obtenerReporteGeneralRutinas() {
    return this.http.get(this.BASE_URL+'/planificador_aprendices_reporte', {observe: 'response', responseType: 'blob'})
  }

  obtenerReporteEspecificoRutina(id_user: string) {
    return this.http.get(this.BASE_URL+`/planificador_aprendices_reporte/${id_user}`, {observe: 'response', responseType: 'blob'})
  }
}
