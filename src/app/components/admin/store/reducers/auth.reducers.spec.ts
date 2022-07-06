import { AuthenticationService } from 'src/app/auth/service/auth.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app';
import { AuthActionTypes } from '../actions/auth.actions';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AdminEffects } from '../effects/auth.effects';
import { ArticleService } from 'src/app/service/article.service';
import { Adminreducer } from './auth.reducers';
import { FireStoreMock } from 'src/app/test/mock/services/article-mockservice.mock';

describe('reducer: Admin', () => {
  let actions: Observable<any>;
  let effects: AdminEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)
      ],
      providers: [
        AdminEffects,
        provideMockActions(() => actions),
        {
          provide: ArticleService,
          useValue: FireStoreMock
        }
      ]
    });
    effects = TestBed.get(AdminEffects);
  });



  // it('test reducer Admin ADD_ARTICLE', () => {
  //   Adminreducer({
  //     articleList: [],
  //     loading: true,
  //     errorMessage: null
  //   }, {
  //     payload: {
  //       Image: "Image1",
  //       Image2: "Image2",
  //       category: "Shirt",
  //       description: "Care Instructions: First Time Dry-Clean followed by hand wash Fit Type: Regular Fit Care Instructions: Do not Bleach, Normal Machine Wash Or Hand Wash Ideal for : Shirts men , Size : S , M , L , XL , XXL casual shirts Fit : Slim fit shirts for men , Sleeve : Shirt for men full sleeves Pattern : Solid plain shirt man , Event : Casual shirts Fabric : Cotton shirt for man , Gender : Shirts for men",
  //       name: "MOONVELLY Men's Slim Fit Stylish Full Sleeve Shirts",
  //       price: 399.00,
  //       type: "B",
  //       Id: '12342'
  //     },
  //     type: AuthActionTypes.ADD_ARTICLE
  //   });
  // });
  // it('test reducer Admin AritlceList_Fail', () => {
  //   Adminreducer({
  //     articleList: [],
  //     loading: true,
  //     errorMessage: null
  //   }, {
  //     type: AuthActionTypes.AritlceList_Fail
  //   });
  // });

});
