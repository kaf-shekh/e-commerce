import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store/';
import { reducers } from 'src/app';
import { LogInSuccess } from 'src/app/store/actions/auth.actions';
import { MainAppState } from 'src/app/store/reducers/auth.reducers';
import { MockStore } from 'src/app/test/mock/store/mockstore.mock';
import { AdminComponent } from '../admin.component';
import { ArticleListComponent } from '../article-list/article-list.component';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router: Router;
  let mockStore: MockStore<MainAppState>;

  let userData: {
    token: "dsfdfg",
    email: "testmail@mail.com",
    userId: "userUUIDknown3424",
    isAdmin: false,
    emailVerified: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent, ArticleListComponent, AdminComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([{
        path: 'admin', component: AdminComponent, children: [
          { path: '', component: ArticleListComponent },
          { path: 'article-list/:edit', component: ArticleListComponent },
          { path: 'login', component: LoginPageComponent },

        ]
      }]), FormsModule, StoreModule.forRoot(reducers),],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        // { provide: Router, useClass: RouterStub },
        { provide: Store, useValue: new MockStore<MainAppState>(null, true) }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check user login or not', () => {
    component.store.dispatch(new LogInSuccess(userData));
    component.checkUser();
  });

  it('call loginSubmit function if form is valid', () => {
    component.form.patchValue({
      email: 'test@mail.com',
      password: '123456'
    })
    component.loginSubmit();
  });

  it('call loginSubmit function if form is not valid with admin email', () => {
    component.form.patchValue({
      email: null,
      password: 'xyzdjad'
    })
    component.loginSubmit();
  });

  it('call loginSubmit function if form is valid', () => {
    component.form.patchValue({
      email: 'kaf.shekh9@gmail.com',
      password: 'xyzdjad'
    });
    component.currentUser = {
      email: 'user@mail.com',
      isAdmin: true
    }
    spyOn(component.router, 'navigate')
    component.loginSubmit();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('call loginSubmit function if form is valid', () => {
    component.form.patchValue({
      email: 'kaf.shekh9@gmail.com',
      password: 'xyzdjad'
    });
    component.loginSubmit();
  });


});
