import { Action } from '@ngrx/store';
import { ArticleModel } from 'src/app/model/article.model';

export enum AuthActionTypes {
  ARTICLELIST = '[Auth] ArticleList',
  AritlceList_Success = '[Auth] AritlceList_Success',
  AritlceList_Fail = '[Auth] AritlceList_Fail',
  ADD_ARTICLE = '[Auth] ADD_ARTICLE',
  EDIT_ARTICLE = '[Auth] EDIT_ARTICLE',
  DELETE_ARTICLE = '[Auth] DELETE_ARTICLE',
}

export class ArticleList implements Action {
  readonly type = AuthActionTypes.ARTICLELIST;
  constructor(public payload?: ArticleModel[]) { }
}

export class AritlceList_Success implements Action {
  readonly type = AuthActionTypes.AritlceList_Success;
  constructor(public payload: ArticleModel[]) {
  }
}

export class AritlceList_Fail implements Action {
  readonly type = AuthActionTypes.AritlceList_Fail;
  constructor() { }
}

export class ADD_ARTICLE implements Action {
  readonly type = AuthActionTypes.ADD_ARTICLE;
  constructor(public payload: ArticleModel) { }
}

export class EDIT_ARTICLE implements Action {
  readonly type = AuthActionTypes.EDIT_ARTICLE;
  constructor(public payload: ArticleModel) {
  }
}

export class DELETE_ARTICLE implements Action {
  readonly type = AuthActionTypes.DELETE_ARTICLE;
  constructor(public payload: string) { }
}



export type All =
  | ArticleList
  | AritlceList_Success
  | AritlceList_Fail
  | ADD_ARTICLE
  | EDIT_ARTICLE
  | DELETE_ARTICLE;
