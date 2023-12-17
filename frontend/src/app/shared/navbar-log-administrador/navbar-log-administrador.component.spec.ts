import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLogAdministradorComponent } from './navbar-log-administrador.component';

describe('NavbarLogAdministradorComponent', () => {
  let component: NavbarLogAdministradorComponent;
  let fixture: ComponentFixture<NavbarLogAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarLogAdministradorComponent]
    });
    fixture = TestBed.createComponent(NavbarLogAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
