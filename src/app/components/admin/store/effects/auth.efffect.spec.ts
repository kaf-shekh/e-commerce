import { Store, StoreModule } from '@ngrx/store';
import { AppStateModel } from 'src/app';
import { TestBed } from '@angular/core/testing';
import { AdminEffects } from '../effects/auth.effects';
import { ArticleService } from 'src/app/service/article.service';
import { ArticleModel } from 'src/app/model/article.model';
import { FireStoreMock } from 'src/app/test/mock/services/article-mockservice.mock';
import { Adminreducer } from '../reducers/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ADD_ARTICLE, AritlceList_Fail, AritlceList_Success, ArticleList, DELETE_ARTICLE, EDIT_ARTICLE } from '../actions/auth.actions';
import { MockStore } from 'src/app/test/mock/store/mockstore.mock';

describe('Effect: Admin', () => {

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
  ];
  let article: ArticleModel = {
    Image: "Image1",
    Image2: "Image2",
    category: "Shirt",
    description: "Care Instructions: First Time Dry-Clean followed by hand wash Fit Type: Regular Fit Care Instructions: Do not Bleach, Normal Machine Wash Or Hand Wash Ideal for : Shirts men , Size : S , M , L , XL , XXL casual shirts Fit : Slim fit shirts for men , Sleeve : Shirt for men full sleeves Pattern : Solid plain shirt man , Event : Casual shirts Fabric : Cotton shirt for man , Gender : Shirts for men",
    name: "MOONVELLY Men's Slim Fit Stylish Full Sleeve Shirts",
    price: 399.00,
    type: "B",
    Id: '12342'
  }

  beforeEach((() => {

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ reducer: Adminreducer }),
        EffectsModule.forRoot([AdminEffects])
      ],
      providers: [
        AdminEffects,
        {
          provide: ArticleService,
          useValue: FireStoreMock
        }, { provide: Store, useValue: MockStore }

      ]
    });

    store = TestBed.get(Store);

  }));

  it('call DELETE_ARTICLE', () => {
    store.dispatch(new DELETE_ARTICLE('Article Id'))
  });

  it('call EDIT_ARTICLE', () => {
    store.dispatch(new EDIT_ARTICLE(article))
  });
  it('call ADD_ARTICLE', () => {
    store.dispatch(new ADD_ARTICLE(article))
  });
  it('call AritlceList_Fail', () => {
    store.dispatch(new AritlceList_Fail())
  });

  it('call ArticleList', () => {
    store.dispatch(new ArticleList())
  });
  it('call AritlceList_Success', () => {
    store.dispatch(new AritlceList_Success(articleList))
  });


});
