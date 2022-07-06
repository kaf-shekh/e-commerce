import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import { mergeMap, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/service/auth.service';
import { AuthActionTypes, LogInFailure, LogInSuccess, SignUpFailure } from '../actions/auth.actions';
import { Observable } from 'rxjs';
import { EffectLogModel } from '../model/auth.model';
import { AppStateModel } from 'src/app';
import { Store } from '@ngrx/store';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private store: Store<AppStateModel>
  ) { }

  // effects go here
  @Effect()
  public LogIn: Observable<any> = this.actions
    .pipe(ofType(AuthActionTypes.LOGIN),
      mergeMap((form: any) => {
        return this.authService.SignIn(form.payload.email, form.payload.password).then(res => {
          return this.store.dispatch(new LogInSuccess({
            token: res.user.refreshToken,
            email: res.user.email,
            userId: res.user.uid,
            isAdmin: res.user.email === 'kaf.shekh9@gmail.com' ? true : false,
            emailVerified: res.user.emailVerified,
          }));
        }).catch((error) => {
          console.log(error);
          this.store.dispatch(new LogInFailure(error.message))
          alert(error.message);
          return error
        });
      }))

  @Effect()
  public SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    switchMap((form: any) => {
      try {
        const res = this.authService.SignUp(form.payload.email, form.payload.password);
        this.router.navigate(['/sign-up']);
        return res;
      } catch (error) {
        alert(error.message);
        console.log(error);
        this.store.dispatch(new SignUpFailure(error.message));
        return error;
      }
    }))


  @Effect({ dispatch: false })
  public LogInSuccess: Observable<EffectLogModel> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user: EffectLogModel) => {
      return user;

    })
  );

  @Effect({ dispatch: false })
  public LogInFailure: Observable<EffectLogModel> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  public Reset_Password: Observable<EffectLogModel> = this.actions.pipe(
    ofType(AuthActionTypes.Reset_Password),
    tap(async (user: EffectLogModel) => {
      return await this.authService.resetPassword(user.payload.email)
    }
    ));

  @Effect({ dispatch: false })
  public Resend_Password_Link: Observable<EffectLogModel> = this.actions.pipe(
    ofType(AuthActionTypes.Reset_Password),
    tap(async (user: EffectLogModel) => {
      return await this.authService.sendEmailVerification()
    }
    )
  );

  @Effect({ dispatch: false })
  public SignUpFailure: Observable<EffectLogModel> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUPFAILURE)
  );


  @Effect({ dispatch: false })
  public LogOut = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    switchMap(async () => {
      await this.authService.SignOut();
      this.router.navigate(['/login']);
    }),
  );

}
