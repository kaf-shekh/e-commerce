import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '..';
import { LoginComponent } from '../components/home/login/login.component';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, LoginComponent],
      imports: [
        FormsModule, ReactiveFormsModule,
        RouterTestingModule.withRoutes([{
          path: 'login',
          component: LoginComponent
        }]), StoreModule.forRoot(reducers),]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logMethode', () => {
    component.logMethode();
  });



  it('should call setwindow moved true', () => {
    component.setwindow(95);
  });

  it('should call  setwindow moved false', () => {
    component.setwindow(0);
  });
  it('should call  setwindow moved false', () => {
    spyOn(component, 'setwindow')
    component.onScroll();
    expect(component.setwindow).toHaveBeenCalled();
  });

});
