import { createFeatureSelector } from '@ngrx/store';
import * as auth from './reducers/auth.reducers';


export interface MainAppState {
  authState: auth.MainAppState;
}


export const MainReducer = {
  auth: auth.MainReducer
};

export const selectAuthState = createFeatureSelector<MainAppState>('auth');
