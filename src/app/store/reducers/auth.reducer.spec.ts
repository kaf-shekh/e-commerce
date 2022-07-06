import { LogIn, LogInFailure, LogInSuccess, LogOut, SignUp } from '../actions/auth.actions';
import { AuthenticationService } from 'src/app/auth/service/auth.service';
import { Action, Store, StoreModule } from '@ngrx/store';
import { ArticleModel } from 'src/app/model/article.model';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/components/home/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from 'src/app/components/home/sign-up/sign-up.component';
import { reducers } from 'src/app';
import { cold, hot } from 'jasmine-marbles';
import { MainReducer } from '../reducers/auth.reducers';
import { AuthActionTypes, All } from '../actions/auth.actions';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AuthEffects } from '../effects/auth.effects';
import { AuthMock } from 'src/app/test/mock/services/auth-mock-service.mock';
import { MockStore } from 'src/app/test/mock/store/mockstore.mock';

describe('Effect: Attendess', () => {
  let actions: Observable<any>;
  let effects: AuthEffects;
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, SignUpComponent],
      imports: [FormsModule, ReactiveFormsModule, StoreModule.forRoot(reducers), RouterTestingModule.withRoutes([
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'sign-up',
          component: SignUpComponent
        }
      ])],
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        {
          provide: AuthenticationService,
          useValue: AuthMock
        }, { provide: Store, useValue: MockStore }

      ]
    });



    service = TestBed.get(AuthenticationService);
    effects = TestBed.get(AuthEffects);
  });



  it('test reducer MainReducer LOGOUT', () => {
    MainReducer({
      isAuthenticated: false,
      user: null,
      errorMessage: null
    }, {
      type: AuthActionTypes.LOGOUT
    });
  });
  it('test reducer MainReducer LOGIN_FAILURE', () => {
    MainReducer({
      isAuthenticated: false,
      user: null,
      errorMessage: null
    }, {
      type: AuthActionTypes.LOGIN_FAILURE
    });
  });

  it('test reducer MainReducer SIGNUPFAILURE', () => {
    MainReducer({
      isAuthenticated: false,
      user: null,
      errorMessage: null
    }, {
      payload: '',
      type: AuthActionTypes.SIGNUPFAILURE
    })
  });
  it('test reducer MainReducer SIGNUP', () => {
    MainReducer({
      isAuthenticated: false,
      user: null,
      errorMessage: null
    }, {
      payload: { email: 'test@mail.com', password: '123435' },
      type: AuthActionTypes.SIGNUP
    })
  });
  it('test reducer MainReducer LOGIN', () => {
    MainReducer({
      isAuthenticated: false,
      user: null,
      errorMessage: null
    }, {
      payload: {
        token: 'TokenID',
        email: 'test@mail.com',
        userId: 'UserUUID',
        isAdmin: false,
        emailVerified: true
      },
      type: AuthActionTypes.LOGIN_SUCCESS
    })
  });
  it('test reducer MainReducer LOGIN Admin', () => {
    MainReducer({
      isAuthenticated: false,
      user: null,
      errorMessage: null
    }, {
      payload: {
        token: 'TokenID',
        email: 'kaf.shekh9@gmail.com',
        userId: 'UserUUID',
        isAdmin: true,
        emailVerified: true
      },
      type: AuthActionTypes.LOGIN_SUCCESS
    })
  });
});
