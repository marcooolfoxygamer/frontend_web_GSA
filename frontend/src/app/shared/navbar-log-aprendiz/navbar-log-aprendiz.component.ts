import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../service-session_storage/session-storage.service';

@Component({
  selector: 'app-navbar-log-aprendiz',
  templateUrl: './navbar-log-aprendiz.component.html',
  styleUrls: ['./navbar-log-aprendiz.component.css']
})
export class NavbarLogAprendizComponent implements OnInit {

  constructor (
    protected sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {

    let rol = this.sessionStorageService.get('rol')

    if (rol != '2') {
      this.sessionStorageService.clear()
    }
  }

}
