import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing/src/testing';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';
import { AritlceList_Fail, AritlceList_Success, AuthActionTypes } from '../actions/auth.actions';
import { } from 'rxjs';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/service/article.service';
import { AdminState } from '../reducers/auth.reducers';
import { EffectAddModel, EffectDeleteModel, EffectEditModel, EffectListModel } from '../model/effect.model';
import { ArticleModel } from 'src/app/model/article.model';


@Injectable()
export class AdminEffects {
  constructor(
    private actions: Actions,
    private articleService: ArticleService,
    private store: Store<AdminState>
  ) { }

  // effects go here
  @Effect({ dispatch: false })
  ArticleList: Observable<EffectListModel> = this.actions.pipe(ofType(AuthActionTypes.ARTICLELIST),
    tap((list: EffectListModel) => {
      return (this.articleService.getProduct()).subscribe((data: any) => {
        let articleList: ArticleModel[] = this.articleService.getData(data);
        return this.store.dispatch(new AritlceList_Success(articleList));
      }, (err) => {
        return this.store.dispatch(new AritlceList_Fail())
      });
    }));


  @Effect({ dispatch: false })
  AritlceList_Success: Observable<any> = this.actions.pipe(ofType(AuthActionTypes.AritlceList_Success),
    tap((list: any) => {
      return list;
    })
  );

  @Effect({ dispatch: false })
  AritlceList_Fail: Observable<EffectListModel> = this.actions.pipe(
    tap((response: EffectListModel) => {
      return response;
    }), ofType(AuthActionTypes.AritlceList_Fail)
  );

  @Effect({ dispatch: false })
  ADD_ARTICLE: Observable<EffectAddModel> = this.actions.pipe(ofType(AuthActionTypes.ADD_ARTICLE),
    tap(async (form: EffectAddModel) => {
      return (await (this.articleService.createProduct(form.payload)))
    })
  );

  @Effect({ dispatch: false })
  EDIT_ARTICLE: Observable<EffectAddModel> = this.actions.pipe(ofType(AuthActionTypes.EDIT_ARTICLE),
    tap((form: EffectEditModel) => {
      return this.articleService.updateProduct(form.payload.Id, form.payload);
    })
  );


  @Effect({ dispatch: false })
  DELETE_ARTICLE: Observable<EffectDeleteModel> = this.actions.pipe(ofType(AuthActionTypes.DELETE_ARTICLE),
    tap((form: EffectDeleteModel) => {
      return this.articleService.deleteProduct(form.payload);
    })
  );

}
