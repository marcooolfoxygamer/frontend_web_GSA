import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAsistenciaComponent } from './listar-asistencia.component';

describe('ListarAsistenciaComponent', () => {
  let component: ListarAsistenciaComponent;
  let fixture: ComponentFixture<ListarAsistenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarAsistenciaComponent]
    });
    fixture = TestBed.createComponent(ListarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
