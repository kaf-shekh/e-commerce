import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from '../home/home.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule, RouterTestingModule.withRoutes([
          {
            path: '',
            component: HomeComponent
          },
          {
            path: 'sign-up',
            component: SignUpComponent
          }
        ]),
        ReactiveFormsModule, FormsModule, StoreModule.forRoot(reducers)
      ],
      declarations: [LoginComponent, SignUpComponent, HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

      // providers: [{ provide: Router, useClass: RouterStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginSubmit with valid form', () => {
    component.form.patchValue(
      {
        email: 'test@mail.com',
        password: '123456'
      }
    )
    component.loginSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should call loginSubmit with invalid', () => {
    component.form.patchValue(
      {
        email: 'test@mail.com',
        password: null,
      }
    )
    component.loginSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should call forgotpassword with invalid', () => {
    component.form.patchValue(
      {
        email: null,
      }
    )
    component.forgotPassword();
    expect(component.isforgot).toBeFalsy();
  });

  it('should call forgotpassword with invalid', () => {
    component.form.patchValue(
      {
        email: 'test@mail.com',
      }
    )
    component.forgotPassword();
    expect(component.isforgot).toBeTruthy();
  });

  it('should call resend', () => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
    component.resend();
    // jasmine.clock().tick(12001);
    // expect(component.timeOver).toBeTruthy();
    jasmine.clock().uninstall();

  });

  it('should call goto home currentUser email verified', () => {
    component.currentUser = {
      emailVerified: true
    };
    spyOn(component.router, 'navigate')

    component.goTohome();
    expect(component.router.navigate).toHaveBeenCalled();

  });

  it('should call goto home currentUser email not verified', () => {
    component.currentUser = {
      emailVerified: false
    }

    spyOn(component.router, 'navigate')
    component.goTohome();
    expect(component.router.navigate).toHaveBeenCalled();

  });

  it('should call goto home currentUser is undefined', () => {

    component.goTohome();

  });
});
