import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarsComponent } from './navbars.component';

describe('NavbarsComponent', () => {
  let component: NavbarsComponent;
  let fixture: ComponentFixture<NavbarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarsComponent]
    });
    fixture = TestBed.createComponent(NavbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
