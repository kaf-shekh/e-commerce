import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { reducers } from 'src/app';
import { ArticleService } from 'src/app/service/article.service';
import { FireStoreMock } from 'src/app/test/mock/services/article-mockservice.mock';
import { MockStore } from 'src/app/test/mock/store/mockstore.mock';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent, HomeComponent,
        LoginComponent,],
      imports: [ReactiveFormsModule,
        FormsModule,
        StoreModule.forRoot(reducers),
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: HomeComponent
          },
          {
            path: 'login',
            component: LoginComponent
          }
        ]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

      providers: [{ provide: ArticleService, useClass: FireStoreMock }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signup with invalid', () => {
    component.form.patchValue(
      {
        email: 'test@mail.com',
        password: null,
      }
    );
    component.signup();
    expect(component.submitted).toBeTruthy();
  });

  it('should call signup with valid', () => {
    component.form.patchValue(
      {
        email: 'test@mail.com',
        password: '1234567',
      }
    )
    component.signup();
    expect(component.submitted).toBeTruthy();
  });


  it('should call resend', () => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
    component.resend();
    // jasmine.clock().tick(12001);
    // expect(component.timeOver).toBeTruthy();
    jasmine.clock().uninstall();

  });

  it('should call reLogin', () => {
    component.reLogin();

  });

  it('should call goTohome', () => {
    component.currentUser = {
      emailVerified: true
    }
    component.goTohome();

  });
});
