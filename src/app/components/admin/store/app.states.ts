import { createFeatureSelector } from '@ngrx/store';
import * as admin from './reducers/auth.reducers';


export interface AdminState {
  authState: admin.AdminState;
}


export const Adminreducers = {
  admin: admin.Adminreducer
};

export const selectAdminAuthState = createFeatureSelector<AdminState>('admin');
