import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BehaviorSubject, Subscription } from 'rxjs';
import { reducers } from 'src/app';
import { AdminEffects } from 'src/app/components/admin/store/effects/auth.effects';
import { HomeComponent } from 'src/app/components/home/home/home.component';
import { HomeEffects } from 'src/app/components/home/store/effects/auth.effects';
import { AuthEffects } from 'src/app/store/effects/auth.effects';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from './auth.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let afAuth: AngularFireAuth;

  const credentialsMock = {
    email: 'abc@123.com',
    password: 'password'
  };

  const userMock = {
    refreshToken: 'Token',
    email: 'test@email.com',
    uid: 'userIDUUID',
    emailVerified: true,
  };
  const adminMock = {
    refreshToken: 'Token',
    email: 'kaf.shekh9@gmail.com',
    uid: 'userIDUUID',
    emailVerified: true,
  };

  const fakeAuthState = new BehaviorSubject(null); // <= Pay attention to this guy

  const fakeSignInHandler = (): Promise<any> => {
    fakeAuthState.next(userMock);
    return Promise.resolve(userMock);
  };

  const fakeSignOutHandler = (): Promise<any> => {
    fakeAuthState.next(null);
    return Promise.resolve();
  };
  const fakeseandMail = (): Promise<any> => {
    return Promise.resolve();
  };

  const angularFireAuthStub = {
    authState: fakeAuthState,
    currentUser: fakeAuthState,
    createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.callFake(fakeSignInHandler),
    signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.callFake(fakeSignInHandler),
    signOut: jasmine.createSpy('signOut').and.callFake(fakeSignOutHandler),
    sendEmailVerification: jasmine.createSpy('sendEmailVerification'),
    verifyPasswordResetCode: jasmine.createSpy('verifyPasswordResetCode'),
    sendPasswordResetEmail: jasmine.createSpy('sendPasswordResetEmail'),
  };



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [StoreModule.forRoot(reducers),
      RouterTestingModule.withRoutes([
        {
          path: '',
          component: HomeComponent
        }
      ]),
      EffectsModule.forRoot([HomeEffects, AdminEffects, AuthEffects]),
      StoreDevtoolsModule.instrument(),
      AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub }
      ]
    });
    service = TestBed.inject(AuthenticationService);
    afAuth = TestBed.get(AngularFireAuth);

  });

  afterEach(() => {
    fakeAuthState.next(null);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should be authenticated after logging in', () => {
    fakeAuthState.next(userMock);
    service.SignIn(credentialsMock.email, credentialsMock.password);

  });
  it('should be authenticated if admin', () => {
    fakeAuthState.next(adminMock);

  });

  it('should be authenticated after register', () => {
    fakeAuthState.next(userMock);
    service.SignUp(credentialsMock.email, credentialsMock.password);
  });

  it('should not be authenticated after logging out', () => {
    fakeAuthState.next(userMock);
    service.SignIn(credentialsMock.email, credentialsMock.password);
    service.SignOut();

  });


  //send Email Verification
  it('should be send Email Verification', async () => {
    fakeAuthState.next(userMock);
    service.sendEmailVerification();
  });

  // send Email Verification if user null
  it('should be send Email Verification', async () => {
    fakeAuthState.next(null);
    service.sendEmailVerification();
  });

  //reset password
  it('should be call reset password', async () => {
    await service.resetPassword('test@mail.com');
  });

  //reset password
  it('should be call sendPasswordResetEmail', async () => {
    await service.sendPasswordResetEmail('test@mail.com');
  });

});
