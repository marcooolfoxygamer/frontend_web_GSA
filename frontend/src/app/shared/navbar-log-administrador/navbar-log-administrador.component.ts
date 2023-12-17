import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../service-session_storage/session-storage.service';

@Component({
  selector: 'app-navbar-log-administrador',
  templateUrl: './navbar-log-administrador.component.html',
  styleUrls: ['./navbar-log-administrador.component.css']
})
export class NavbarLogAdministradorComponent implements OnInit {

  constructor (
    protected sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {

    let rol = this.sessionStorageService.get('rol')

    if (rol != '1') {
      this.sessionStorageService.clear()
    }
  }

}
