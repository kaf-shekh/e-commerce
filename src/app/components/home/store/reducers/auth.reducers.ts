import { ArticleModel } from "src/app/model/article.model";
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface HomeState {

  articles: ArticleModel[];
  loading: boolean;
}
export const initialState: HomeState = {
  articles: [],
  loading: true,

}


export function Homereducer(state: HomeState, action: All): HomeState {
  switch (action.type) {
    case AuthActionTypes.Aritlce_Success: {
      return {
        ...state,
        articles: action.article,
        loading: false,
      }
    };
    case AuthActionTypes.Aritlce_Failure: {
      return {
        ...state,
        articles: [],
        loading: false,
      }
    };

    default: {
      return state;
    }
  }
}
