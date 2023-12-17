import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { SessionStorageService } from '../service-session_storage/session-storage.service';

@Component({
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.css']
})
export class NavbarsComponent implements OnInit {

  constructor(
    protected sessionStorageService: SessionStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // rol: string | null = '';
  no_iniciado = 0;
  administrador = 0;
  aprendiz = 0;
  instructor = 0;

  ngOnInit() {
    
    let rol = this.sessionStorageService.get('rol')

    if (!rol || rol == '0') {
      this.no_iniciado=1;
      this.administrador=0;
      this.aprendiz=0;
      this.instructor=0;
    }
    if (rol == '1') {
      this.administrador = 1;
      this.no_iniciado=0;
      this.aprendiz=0;
      this.instructor=0;
    }
    if(rol == '2') {
      this.aprendiz = 1;
      this.no_iniciado=0;
      this.administrador = 0;
      this.instructor=0;
    }
    if (rol == '3') {
      this.instructor = 1;
      this.no_iniciado=0;
      this.administrador = 0;
      this.aprendiz=0;
    }

  }

}
