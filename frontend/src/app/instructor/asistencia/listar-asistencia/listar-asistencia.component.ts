import { Component, OnInit, } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Route, Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { AsistenciaListaModel } from 'src/app/shared/service-asistencia/asistencia.model';
import { AsistenciaService } from 'src/app/shared/service-asistencia/asistencia.service';
import { SessionStorageService } from 'src/app/shared/service-session_storage/session-storage.service';

@Component({
  selector: 'app-listar-asistencia',
  templateUrl: './listar-asistencia.component.html',
  styleUrls: ['./listar-asistencia.component.css']
})
export class ListarAsistenciaComponent implements OnInit {

  public oculto = true;
  public id_reg:any;

  busquedaFiltrar = ""
  filtrarTodos = ""
  filtrarIdAprendiz = ""
  filtrarIdInstructor = ""
  filtrarNombre = ""
  filtroNombres = new AsistenciaListaModel("","","","","","","","","","")
  filtrarFecha = ""
  asistencias: Observable<AsistenciaListaModel[]> | undefined;
  private searchTerms = new BehaviorSubject<string>('');

  constructor(
    private asistenciaService: AsistenciaService,
    protected sessionStorageService: SessionStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let rol = this.sessionStorageService.get('rol')

    if (rol != '3') {
      this.sessionStorageService.clear()
    }
    
    this.asistencias = this.searchTerms.pipe(
      debounceTime(300), // Espera 300 ms después de cada cambio
      distinctUntilChanged(), // Asegura que solo se realiza la búsqueda si hay cambios
      switchMap((term: string) => this.obtenerDatosFiltrados(term))
    );
  }

  // Filtración búsqueda

  obtenerDatosFiltrados(term: string): Observable<AsistenciaListaModel[]> {
    if (!term) {
      return this.asistenciaService.obtenerAsistencias();

    } else if (this.busquedaFiltrar == 'todos') {
      return this.asistenciaService.obtenerAsistencias();

    } else if (this.busquedaFiltrar == 'idAprendiz') {
      return this.asistenciaService.filterListadoAsistenciasIdAprendiz(term);

    } else if (this.busquedaFiltrar == 'idInstructor') {
      return this.asistenciaService.filterListadoAsistenciasIdInstructor(term);

    } else if (this.busquedaFiltrar == 'nombre') {

      let nombreDividido = this.filtrarNombre.split(" ")

      if (nombreDividido.length == 1) {
        return this.asistenciaService.filterListadoAsistenciasNombre1(term);
      } else {
        this.filtroNombres.nom1_user = nombreDividido[0]
        this.filtroNombres.ape1_user = nombreDividido[1]

        return this.asistenciaService.filterListadoAsistenciasNombres(this.filtroNombres);
      }
      
    } else if (this.busquedaFiltrar == 'fecha') {
      return this.asistenciaService.filterListadoAsistenciasFecha(term);

    } else {
      return this.asistenciaService.obtenerAsistencias();
    }
  }

  buscarTodos() {
    this.searchTerms.next(this.filtrarTodos);
  }

  buscarIdAprendiz() {
    this.searchTerms.next(this.filtrarIdAprendiz);
  }

  buscarIdInstructor() {
    this.searchTerms.next(this.filtrarIdInstructor);
  }

  buscarNombre() {
    this.searchTerms.next(this.filtrarNombre)
  }

  buscarFecha() {
    this.searchTerms.next(this.filtrarFecha)
  }

  // Pop-up eliminación

  showConfirmBox(id_r:any) {
    this.id_reg = id_r
    this.oculto = false
  }

  closeConfirmBox() {
    this.oculto = true
  }

  isConfirm(answer:boolean) {
    if (answer) {
      this.asistenciaService.eliminarAsistencia(this.id_reg).subscribe(data => {
        window.location.reload();
      })
    }
    this.closeConfirmBox();
  }

}
