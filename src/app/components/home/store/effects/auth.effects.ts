import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Aritlce_Failure, Aritlce_Success, AuthActionTypes } from '../actions/auth.actions';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/service/article.service';
import { Store } from '@ngrx/store';
import { EffectArticleList } from '../model/effect.model';
import { AppStateModel } from 'src/app';
import { ArticleModel } from 'src/app/model/article.model';
import { map } from 'rxjs/operators';


@Injectable()
export class HomeEffects {

  constructor(
    private actions: Actions,
    private articleService: ArticleService,
    private store: Store<AppStateModel>) { }

  @Effect({ dispatch: false })
  HomePage = this.actions.pipe(
    ofType(AuthActionTypes.HomePage),
    tap(() => {
      return ((this.articleService.getProduct())).subscribe(
        (data: any) => {
          let articleList: ArticleModel[] = this.articleService.getData(data);
          return this.store.dispatch(new Aritlce_Success(articleList));
        }, (err) => {
          return this.store.dispatch(new Aritlce_Failure(err.message))
        });
    }))


  @Effect({ dispatch: false })
  Aritlce_Success = this.actions.pipe(ofType(AuthActionTypes.Aritlce_Success),
    map((user: EffectArticleList) => {
      return user;
    })
  );

  @Effect({ dispatch: false })
  Aritlce_Failure: Observable<EffectArticleList> = this.actions.pipe(ofType(AuthActionTypes.Aritlce_Failure),
    tap((user: EffectArticleList) => {
      return user;
    })
  );
}
