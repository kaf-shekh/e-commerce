
import { Action, StoreModule } from '@ngrx/store';
import { ArticleModel } from 'src/app/model/article.model';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/components/home/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from 'src/app/components/home/sign-up/sign-up.component';
import { reducers } from 'src/app';
import { cold, hot } from 'jasmine-marbles';
import { Homereducer } from '../reducers/auth.reducers';
import { AuthActionTypes, All } from '../actions/auth.actions';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HomeEffects } from '../effects/auth.effects';
import { ArticleService } from 'src/app/service/article.service';

describe('Effect: Attendess', () => {
  let actions: Observable<any>;
  let effects: HomeEffects;
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, SignUpComponent],
      imports: [FormsModule, ReactiveFormsModule, StoreModule.forRoot(reducers), RouterTestingModule.withRoutes([
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'sign-up',
          component: SignUpComponent
        }
      ])],
      providers: [
        HomeEffects,
        provideMockActions(() => actions),
        {
          provide: ArticleService,
          useValue: jasmine.createSpyObj('ArticleService', ['add'])
        }
      ]
    });



    service = TestBed.get(ArticleService);
    effects = TestBed.get(HomeEffects);
  });


  it('test reducer MainReducer LOGIN Admin', () => {
    Homereducer({
      articles: [],
      loading: true,
    }, {
      type: AuthActionTypes.Aritlce_Failure
    })
  });
  it('test reducer MainReducer LOGIN Admin', () => {
    Homereducer({
      articles: [],
      loading: true,
    }, {
      article: [],
      type: AuthActionTypes.Aritlce_Success
    })
  });

});
