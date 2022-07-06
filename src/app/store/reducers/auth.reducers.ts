import { User } from "src/app/model/User.model";
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface MainAppState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: MainAppState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
}


export function MainReducer(state: MainAppState, action: All): MainAppState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
          userId: action.payload.userId,
          isAdmin: action.payload.email === 'kaf.shekh9@gmail.com' ? true : false,
          emailVerified: action.payload.emailVerified,
        },
        errorMessage: null
      };
    };
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.SIGNUP: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case AuthActionTypes.SIGNUPFAILURE: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
