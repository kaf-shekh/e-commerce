import { Action } from '@ngrx/store';
import { User } from 'src/app/model/User.model';
// import { ,createAction, props,createReducer, on } from '@ngrx/store'; // -v 11

import { EffectLogModel } from '../model/auth.model';


export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  SIGNUP = '[Auth] SignUp',
  SIGNUPFAILURE = '[Auth] SignUpFailure',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  Reset_Password = '[Auth] Reset_Password',
  Resend_Password_Link = '[Auth] Resend_Password_Link',
  LOGOUT = '[Auth] Logout',
  check = '[Auth] check',

}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: EffectLogModel["payload"]) {
  }
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: EffectLogModel['payload']) { }
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUPFAILURE;
  constructor(public payload: string) { }
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) {
  }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload?: string) { }
}
export class Resend_Password_Link implements Action {
  readonly type = AuthActionTypes.Resend_Password_Link;
}
export class Reset_Password implements Action {
  readonly type = AuthActionTypes.Reset_Password;
  constructor(public payload: string) { }
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;

}


export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | LogOut
  | SignUp
  | SignUpFailure;



