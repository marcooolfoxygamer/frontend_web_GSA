import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../service-session_storage/session-storage.service';

@Component({
  selector: 'app-navbar-log-instructor',
  templateUrl: './navbar-log-instructor.component.html',
  styleUrls: ['./navbar-log-instructor.component.css']
})
export class NavbarLogInstructorComponent implements OnInit {

  constructor (
    protected sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {

    let rol = this.sessionStorageService.get('rol')

    if (rol != '3') {
      this.sessionStorageService.clear()
    }
  }

}
