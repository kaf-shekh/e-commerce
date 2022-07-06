import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { reducers } from 'src/app';
import { ArticleService } from 'src/app/service/article.service';
import { FireStoreMock } from 'src/app/test/mock/services/article-mockservice.mock';
import { MockStore } from 'src/app/test/mock/store/mockstore.mock';

import { AddArticleComponent } from './add-article.component';

describe('AddArticleComponent', () => {
  let component: AddArticleComponent;
  let fixture: ComponentFixture<AddArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddArticleComponent],
      imports: [ReactiveFormsModule, FormsModule,
        StoreModule.forRoot(reducers),],
      providers: [{ provide: ArticleService, useValue: FireStoreMock },
        { provide: Store, useValue: MockStore }
      ]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //component created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // submit function
  it('should call submit Function with valid form', () => {
    component.articleForm.patchValue({
      Image: "Image1",
      Image2: "Image2",
      category: "Shirt",
      description: "Care Instructions: First Time Dry-Clean followed by hand wash Fit Type: Regular Fit Care Instructions: Do not Bleach, Normal Machine Wash Or Hand Wash Ideal for : Shirts men , Size : S , M , L , XL , XXL casual shirts Fit : Slim fit shirts for men , Sleeve : Shirt for men full sleeves Pattern : Solid plain shirt man , Event : Casual shirts Fabric : Cotton shirt for man , Gender : Shirts for men",
      name: "MOONVELLY Men's Slim Fit Stylish Full Sleeve Shirts",
      price: "399.00",
      type: "B"
    });

    component.submit();
    spyOn(component, 'cancel')
    expect(component.isSubmitted).toBeFalsy();
  });

  it('should call submit Function with invalid form', () => {
    component.articleForm.patchValue({
      Image: "image1",
      Image2: null,
      category: "Shirt",
      description: "Care Instructions: First Time Dry-Clean followed by hand wash Fit Type: Regular Fit Care Instructions: Do not Bleach, Normal Machine Wash Or Hand Wash Ideal for : Shirts men , Size : S , M , L , XL , XXL casual shirts Fit : Slim fit shirts for men , Sleeve : Shirt for men full sleeves Pattern : Solid plain shirt man , Event : Casual shirts Fabric : Cotton shirt for man , Gender : Shirts for men",
      name: "MOONVELLY Men's Slim Fit Stylish Full Sleeve Shirts",
      price: "399.00",
      type: "B"
    })
    component.submit();
    expect(component.isSubmitted).toBeTruthy();
  });

  // cancel function
  it('should call cancel Function', () => {
    component.cancel();
    expect(component.isSubmitted).toBeFalsy();
  });
  // clearImage function
  it('should call cancel Function', () => {
    component.clearImage('Image');
    expect(component.articleForm.value['Image']).toBe(undefined);
  });

  // handleFileInput function
  it('should call handleFileInput Function', () => {

    const target = {
      files: [{
        type: "image/jpeg",
        size: 25203
      }
      ],
      result: 'string'
    }
    const event = { target }
    component.handleFileInput(event, 'Image');
  });

  it('should call handleFileInput Function file size greater than 2mb', () => {

    const target = {
      files: [{
        type: "image/jpeg",
        size: 2000999
      }
      ],
      result: 'string'
    }
    const event = { target }
    component.handleFileInput(event, 'Image');
  });

  it('should call handleFileInput Function file size greater than 2mb', () => {

    const target = {
      files: [{
        type: "image/xyz",
        size: 20097
      }
      ],
      result: 'string'
    }
    const event = { target }
    component.handleFileInput(event, 'Image');
  });

  // it('should call render Function file ', () => {

  //   const file = [{
  //     lastModified: 1640955005368,
  //     lastModifiedDate: new Date(),
  //     name: "Petit-Violette-Bois-de-Rose-01_700x.jpg",
  //     size: 25203,
  //     type: "image/jpeg",
  //     webkitRelativePath: "",
  //   }]
  //   component.renderFile('Image');

  // });
});


