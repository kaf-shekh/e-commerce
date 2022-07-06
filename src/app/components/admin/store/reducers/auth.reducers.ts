import { ArticleModel } from "src/app/model/article.model";
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface AdminState {
  articleList: ArticleModel[] | ArticleModel,
  loading: boolean,
  errorMessage?: string,
}

export const initialState: AdminState = {
  articleList: [],
  loading: true,
  errorMessage: null
}


export function Adminreducer(state: AdminState, action: All): AdminState {
  switch (action.type) {
    case AuthActionTypes.AritlceList_Success: {
      return {
        ...state,
        articleList: action.payload,
        loading: false
      };
    }
    case AuthActionTypes.EDIT_ARTICLE: {
      return {
        ...state,
        articleList: action.payload,
        loading: false
      };
    }
    case AuthActionTypes.ADD_ARTICLE: {
      return {
        ...state,
        articleList: action.payload,
        loading: false
      };
    }
    case AuthActionTypes.AritlceList_Fail: {
      return {
        ...state,
        loading: false,
        errorMessage: 'Some error Occured Sorry !!!',
      }
    }

    default: {
      return state;
    }
  }

}
