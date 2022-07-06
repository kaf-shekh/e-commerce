
import { async, TestBed } from '@angular/core/testing';
import { Actions, EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { HomeEffects } from './auth.effects'
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import { ArticleService } from 'src/app/service/article.service';
import { TestActions } from 'src/app/test/mock/store/action.mock';
import { Aritlce_Failure, Aritlce_Success, HomePage } from '../actions/auth.actions';
import { ArticleModel } from 'src/app/model/article.model';
import { Homereducer } from '../reducers/auth.reducers';
import { AppStateModel } from 'src/app';
import { FireStoreMock } from 'src/app/test/mock/services/article-mockservice.mock';

describe('Effect Tests', () => {

  let store: Store<AppStateModel>;
  let articleList: ArticleModel[] = [
    {
      Image: "Image1",
      Image2: "Image2",
      category: "Shirt",
      description: "Care Instructions: First Time Dry-Clean followed by hand wash Fit Type: Regular Fit Care Instructions: Do not Bleach, Normal Machine Wash Or Hand Wash Ideal for : Shirts men , Size : S , M , L , XL , XXL casual shirts Fit : Slim fit shirts for men , Sleeve : Shirt for men full sleeves Pattern : Solid plain shirt man , Event : Casual shirts Fabric : Cotton shirt for man , Gender : Shirts for men",
      name: "MOONVELLY Men's Slim Fit Stylish Full Sleeve Shirts",
      price: 399.00,
      type: "B",
      Id: '12342'
    },
    {
      Image: "Image1",
      Image2: "Image2",
      category: "Shirt",
      description: "Care Instructions: First Time Dry-Clean followed by hand wash Fit Type: Regular Fit Care Instructions: Do not Bleach, Normal Machine Wash Or Hand Wash Ideal for : Shirts men , Size : S , M , L , XL , XXL casual shirts Fit : Slim fit shirts for men , Sleeve : Shirt for men full sleeves Pattern : Solid plain shirt man , Event : Casual shirts Fabric : Cotton shirt for man , Gender : Shirts for men",
      name: "MOONVELLY Men's Slim Fit Stylish Full Sleeve Shirts",
      price: 399.00,
      type: "B",
      Id: '14242'
    }, {
      Image: "Image1",
      Image2: "Image2",
      category: "Shirt",
      description: "Care Instructions: First Time Dry-Clean followed by hand wash Fit Type: Regular Fit Care Instructions: Do not Bleach, Normal Machine Wash Or Hand Wash Ideal for : Shirts men , Size : S , M , L , XL , XXL casual shirts Fit : Slim fit shirts for men , Sleeve : Shirt for men full sleeves Pattern : Solid plain shirt man , Event : Casual shirts Fabric : Cotton shirt for man , Gender : Shirts for men",
      name: "MOONVELLY Men's Slim Fit Stylish Full Sleeve Shirts",
      price: 399.00,
      type: "B",
      Id: '12342'
    }
  ]

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ reducer: Homereducer }),
        EffectsModule.forRoot([HomeEffects])
      ],
      providers: [
        HomeEffects,
        {
          provide: ArticleService,
          useValue: FireStoreMock
        }
      ]
    });

    store = TestBed.get(Store);

  }));

  it('should return Aritlce_Success', async () => {
    store.dispatch(new Aritlce_Success(articleList));
  });

  it('should return Aritlce_Failure', async () => {
    store.dispatch(new Aritlce_Failure());
  });
  it('should call HomePage', async () => {
    store.dispatch(new HomePage());
  });
  // })

})
