import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLogAprendizComponent } from './navbar-log-aprendiz.component';

describe('NavbarLogAprendizComponent', () => {
  let component: NavbarLogAprendizComponent;
  let fixture: ComponentFixture<NavbarLogAprendizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarLogAprendizComponent]
    });
    fixture = TestBed.createComponent(NavbarLogAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
