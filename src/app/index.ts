import { ActionReducerMap } from "@ngrx/store";
import { AdminState, Adminreducer } from "./components/admin/store/reducers/auth.reducers";
import { Homereducer, HomeState } from "./components/home/store/reducers/auth.reducers";
import { MainAppState, MainReducer } from "./store/reducers/auth.reducers";

export interface AppState {
  HomeState: HomeState;
  AdminState: AdminState;
  MainStates: MainAppState
}

export const reducers: ActionReducerMap<AppState> = {
  HomeState: Homereducer,
  AdminState: Adminreducer,
  MainStates: MainReducer
};

export class AppStateModel {
  HomeState: HomeState;
  AdminState: AdminState;
  MainStates: MainAppState;

}
