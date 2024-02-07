import { Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { TiposUsuarios, UsuarioModel } from 'src/app/shared/service-usuario/usuario.model';
import { UsuarioService } from 'src/app/shared/service-usuario/usuario.service';
import { SessionStorageService } from 'src/app/shared/service-session_storage/session-storage.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  busquedaFiltrar = ""
  filtrarTodos = ""
  filtrarId = ""
  filtrarNombre = ""
  filtroNombres = new UsuarioModel("","","","","","","","","","","","")
  filtrarRol = ""
  private searchTerms = new BehaviorSubject<string>('');
  // searchTerm$ = new Subject<string>();
  usuarios$: Observable<UsuarioModel[]> | undefined;
  tiposusuarios: Observable<TiposUsuarios[]> | undefined;
  // private filterSvc = inject(UsuarioService)

  constructor(
    private usuarioService: UsuarioService,
    protected sessionStorageService: SessionStorageService,
  ) {
    // this.usuarios$ = this.searchTerm$.pipe(
    //   debounceTime(400),
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.filterSvc.filterListadoUsuariosId(term))
    // )
  }

  ngOnInit() {
    let rol = this.sessionStorageService.get('rol')

    if (rol != '1') {
      this.sessionStorageService.clear()
    }
    this.tiposusuarios = this.usuarioService.obtenerTiposUsuarios();
    // this.obtenerTodosDatos()
    // this.usuarios$ = this.usuarioService.obtenerUsuarios();
    // this.usuarios$ = this.usuarioService.obtenerUsuarios()
    //   .pipe(
    //     debounceTime(400), // Espera 400 ms después de cada cambio
    //     distinctUntilChanged(), // Asegura que solo se realiza la búsqueda si hay cambios
    //     switchMap(() => this.usuarioService.filterListadoUsuariosId(this.filtrarId))
    //   );
    // this.usuarios$ = this.searchTerms.pipe(
    //     debounceTime(400), // Espera 400 ms después de cada cambio
    //     distinctUntilChanged(), // Asegura que solo se realiza la búsqueda si hay cambios
    //     switchMap((term: string) => this.usuarioService.filterListadoUsuariosId(term))
    //   );
    this.usuarios$ = this.searchTerms.pipe(
      debounceTime(300), // Espera 300 ms después de cada cambio
      distinctUntilChanged(), // Asegura que solo se realiza la búsqueda si hay cambios
      switchMap((term: string) => this.obtenerDatosFiltrados(term))
    );
  }

  // Filtración búsqueda

  obtenerDatosFiltrados(term: string): Observable<UsuarioModel[]> {
    if (!term) {
      return this.usuarioService.obtenerUsuarios();

    } else if (this.busquedaFiltrar == 'todos') {
      return this.usuarioService.obtenerUsuarios();

    } else if (this.busquedaFiltrar == 'id') {
      return this.usuarioService.filterListadoUsuariosId(term);

    } else if (this.busquedaFiltrar == 'nombre') {

      let nombreDividido = this.filtrarNombre.split(" ")
      
      if (nombreDividido.length == 1) {
        return this.usuarioService.filterListadoUsuariosNombre1(term);
      } else {
        this.filtroNombres.nom1_user = nombreDividido[0]
        this.filtroNombres.ape1_user = nombreDividido[1]

        return this.usuarioService.filterListadoUsuariosNombres(this.filtroNombres);
      }

    } else if (this.busquedaFiltrar == 'rol') {
      return this.usuarioService.filterListadoUsuariosRol(term);

    } else {
      return this.usuarioService.obtenerUsuarios();
    }
  }

  buscarTodos() {
    this.searchTerms.next(this.filtrarTodos);
  }

  buscarId() {
    this.searchTerms.next(this.filtrarId);
  }

  buscarNombre() {
    this.searchTerms.next(this.filtrarNombre)
  }

  buscarRol() {
    this.searchTerms.next(this.filtrarRol)
  }

  // buscarDatos() {
  //   if (this.filtrarId) {
  //     // Ejecuta la búsqueda solo si hay un ID proporcionado
  //     console.log('Buscando')
  //     this.usuarios$ = this.usuarioService.filterListadoUsuariosId(this.filtrarId)

  //     // this.usuarioService.filterListadoUsuariosId(this.filtrarId).subscribe(data => {
  //     //   this.usuarios$ = data[0];
  //     // }, error => {
  //     //   console.log(error);
  //     // })
  //   } else {
  //     // Si no hay ID proporcionado, muestra todos los datos
  //     this.obtenerTodosDatos()
  //     // this.usuarioService.obtenerUsuarios().subscribe(
  //     //   (datos) => {
  //     //     this.usuarios$ = datos;
  //     //   },
  //     //   (error) => {
  //     //     console.error(error);
  //     //   }
  //     // );
  //   }
  // }

  // search(event: Event): void {
  //   const element = event.currentTarget as HTMLInputElement;
  //   this.searchTerm$.next(element.value);
  // }

}
