import { ElementRef, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { reducers } from 'src/app';
import { ArticleModel } from 'src/app/model/article.model';
import { ArticleService } from 'src/app/service/article.service';
import { FireStoreMock } from 'src/app/test/mock/services/article-mockservice.mock';
import { AddArticleComponent } from '../add-article/add-article.component';
import { ArticleComponent } from '../article-card/article.component';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { AritlceList_Success } from '../store/actions/auth.actions';

import { ArticleListComponent } from './article-list.component';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  const storeMock = {
    select() {
      return of({ name: 'Peter', registrationDate: '11/11/18' });
    }
  };

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
      declarations: [ArticleListComponent, AddArticleComponent, ArticleComponent, EditArticleComponent, ArticleDetailComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([]), StoreModule.forRoot(reducers), ModalModule],
      providers: [BsModalService,
        {
          provide: ArticleService,
          useValue: FireStoreMock
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get List', () => {
    component.store.dispatch(new AritlceList_Success(articleList))
    component.getList();
  });

  it('should call close modal', () => {
    component.modalRef = component.modalService.show('add', Object.assign({ backdrop: 'static', class: 'modal-md bg-blue' }));
    component.closeModal();
    // expect(component.modalRef.hide).toHaveBeenCalled();
  });

  it('open modal', () => {
    let template: TemplateRef<ElementRef>
    component.openModal(template, article)
    expect(component.article).toBe(article);
  });
});
