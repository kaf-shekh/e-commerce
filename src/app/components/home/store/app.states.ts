import { createFeatureSelector } from '@ngrx/store';
import * as homeauth from './reducers/auth.reducers';


export interface HomeAppState {
  authState: homeauth.HomeState;
}


export const Homereducers = {
  homeauth: homeauth.Homereducer
};

export const selectHomeAuthState = createFeatureSelector<HomeAppState>('homeauth');
