import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLogInstructorComponent } from './navbar-log-instructor.component';

describe('NavbarLogInstructorComponent', () => {
  let component: NavbarLogInstructorComponent;
  let fixture: ComponentFixture<NavbarLogInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarLogInstructorComponent]
    });
    fixture = TestBed.createComponent(NavbarLogInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
