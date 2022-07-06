


import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';

import { Store, StoreModule } from '@ngrx/store';
import { AppStateModel } from 'src/app';
import { AuthenticationService } from 'src/app/auth/service/auth.service';
import { LoginComponent } from 'src/app/components/home/login/login.component';
import { SignUpComponent } from 'src/app/components/home/sign-up/sign-up.component';
import { AuthMock } from 'src/app/test/mock/services/auth-mock-service.mock';
import { MockStore } from 'src/app/test/mock/store/mockstore.mock';
import { LogIn, LogInFailure, LogInSuccess, LogOut, Resend_Password_Link, Reset_Password, SignUp } from '../actions/auth.actions';
import { MainReducer } from '../app.states';
import { AuthEffects } from './auth.effects';

describe('Effect: AuthEffect', () => {

  let store: Store<AppStateModel>;
  let user: {
    token: 'refreshTokenhdf',
    email: 'test@mail.com',
    userId: 'uuidABSD',
    isAdmin: false,
    emailVerified: true,
  }

  beforeEach((() => {

    TestBed.configureTestingModule({
      declarations: [SignUpComponent, LoginComponent],
      imports: [FormsModule, ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'sign-up',
            component: SignUpComponent
          },
          {
            path: 'login',
            component: LoginComponent
          }
        ]),
        StoreModule.forRoot(MainReducer),
        EffectsModule.forRoot([AuthEffects])
      ],
      providers: [
        AuthEffects,
        {
          provide: AuthenticationService,
          useValue: AuthMock
        }, { provide: Store, useValue: MockStore }

      ]
    });

    store = TestBed.get(Store);

  }));
  it('test Login effect', () => {
    store.dispatch(new LogIn({ email: 'test@mail.com', password: '12334' }))
  });

  it('test SignUp effect', () => {
    store.dispatch(new SignUp({ email: 'test@mail.com', password: '12334' }))
  });
  it('test LogInSuccess effect', () => {
    store.dispatch(new LogInSuccess(user))
  });

  it('test LogInFailure effect', () => {
    store.dispatch(new LogInFailure())
  });
  it('test Reset_Password effect', () => {
    store.dispatch(new Reset_Password('test@mail.com'))
  });
  it('test Resend_Password_Link effect', () => {
    store.dispatch(new Resend_Password_Link())
  });
  it('test LogOut effect', () => {
    store.dispatch(new LogOut())
  });

});


