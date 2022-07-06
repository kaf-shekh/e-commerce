import { ElementRef, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ArticleModel } from 'src/app/model/article.model';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { EditArticleComponent } from '../edit-article/edit-article.component';

import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleComponent, EditArticleComponent, ArticleDetailComponent],
      imports: [ReactiveFormsModule, ModalModule],
      providers: [BsModalService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close modal', () => {
    component.modalRef = component.modalService.show('template', Object.assign({ backdrop: 'static', class: 'modal-md bg-blue' }));
    component.closeModal();
    // expect(component.modalRef.hide).toHaveBeenCalled();
  });

  it('open modal', () => {
    let element: ArticleModel = {
      Image: "Image1",
      Image2: "Image2",
      category: "Shirt",
      description: "Care Instructions: First Time Dry-Clean followed by hand wash Fit Type: Regular Fit Care Instructions: Do not Bleach, Normal Machine Wash Or Hand Wash Ideal for : Shirts men , Size : S , M , L , XL , XXL casual shirts Fit : Slim fit shirts for men , Sleeve : Shirt for men full sleeves Pattern : Solid plain shirt man , Event : Casual shirts Fabric : Cotton shirt for man , Gender : Shirts for men",
      name: "MOONVELLY Men's Slim Fit Stylish Full Sleeve Shirts",
      price: 399.00,
      type: "B",
      Id: '1234242'
    }
    let template: TemplateRef<ElementRef>
    component.openModal(template, element, true)
    expect(component.article).toBe(element);
  });
});
