import { Action } from '@ngrx/store';
import { ArticleModel } from 'src/app/model/article.model';
import { EffectArticleList, ErrorOccur } from '../model/effect.model';

export enum AuthActionTypes {
  HomePage = '[Homeauth] HomePage',
  Aritlce_Success = '[Homeauth] Aritlce_Success',
  Aritlce_Failure = '[Homeauth] Aritlce_Failure',
}

export class HomePage implements Action {
  readonly type = AuthActionTypes.HomePage;

}

export class Aritlce_Success implements Action {
  readonly type = AuthActionTypes.Aritlce_Success;
  constructor(public article: ArticleModel[]) {
  }
}
export class Aritlce_Failure implements Action {
  readonly type = AuthActionTypes.Aritlce_Failure;
  constructor(err?: ErrorOccur) { }
}

export type All =
  | HomePage
  | Aritlce_Success
  | Aritlce_Failure;
