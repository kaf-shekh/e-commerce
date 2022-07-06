import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AppState, reducers } from 'src/app';
import { ArticleModel } from 'src/app/model/article.model';
import { MockStore } from 'src/app/test/mock/store/mockstore.mock';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;


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
  let article: ArticleModel = {
    Image: "Image1",
    Image2: "Image2",
    category: "Shirt",
    description: "Care Instructions: First Time Dry-Clean followed by hand wash Fit Type: Regular Fit Care Instructions: Do not Bleach, Normal Machine Wash Or Hand Wash Ideal for : Shirts men , Size : S , M , L , XL , XXL casual shirts Fit : Slim fit shirts for men , Sleeve : Shirt for men full sleeves Pattern : Solid plain shirt man , Event : Casual shirts Fabric : Cotton shirt for man , Gender : Shirts for men",
    name: "MOONVELLY Men's Slim Fit Stylish Full Sleeve Shirts",
    price: 399.00,
    type: "B",
    Id: '12342'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, StoreModule.forRoot(reducers), CommonModule, ModalModule.forRoot(),
      ],
      providers: [BsModalService,
        { provide: Store, useValue: new MockStore<AppState>(null, true) }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check user login or not', () => {
    spyOn(component, 'getData')
    component.checkUser();
    expect(component.getData).toHaveBeenCalled();
  });

  it('call getArray', () => {
    component.getArray(articleList);
  });

  it('open modal', () => {
    let template: TemplateRef<ElementRef>
    component.openModal(template, article)
    expect(component.article).toBe(article);
  });

  it('should close modal', () => {
    component.modalRef = component.modalService.show('template', Object.assign({ backdrop: 'static', class: 'modal-md bg-blue' }));
    component.closeModal();
  });

  it('select tab function', () => {
    component.titles = [
      {
        name: "Books",
        selected: false
      }, {
        name: "Paint",
        selected: true
      }, {
        name: "Shoes",
        selected: false
      }, {
        name: "Shirt",
        selected: false
      }, {
        name: "Pant",
        selected: false
      }, {
        name: "Bag",
        selected: false
      }
    ]
    component.selectTab(2);
    expect(component.clicked).toBeFalsy();
  });

});
