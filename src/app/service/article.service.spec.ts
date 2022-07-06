import { TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

export class AngularFirestoreMock {
}
export class AngularFireDatabseMock {
}
describe('ArticleService', () => {
  let service: ArticleService;
  let article = {
    Image: "Image1",
    Image2: "Image2",
    category: "Shirt",
    description: "Care Instructions: First Time Dry-Clean followed by hand wash Fit Type: Regular Fit Care Instructions: Do not Bleach, Normal Machine Wash Or Hand Wash Ideal for : Shirts men , Size : S , M , L , XL , XXL casual shirts Fit : Slim fit shirts for men , Sleeve : Shirt for men full sleeves Pattern : Solid plain shirt man , Event : Casual shirts Fabric : Cotton shirt for man , Gender : Shirts for men",
    name: "MOONVELLY Men's Slim Fit Stylish Full Sleeve Shirts",
    price: 399.00,
    type: "B"
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [AngularFirestore]
    });
    service = TestBed.inject(ArticleService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call getProduct', () => {
    service.getProduct();
  });

  it('should be call createProduct', () => {
    service.createProduct(article);
  });

  it('should be call updateProduct', () => {
    service.updateProduct('37EbpjcfcXd94b5xuvwO', article);
  });

  it('should be call getProductById', () => {
    service.getProductById('articleId');
  });
  it('should be call deleteProduct', () => {
    service.deleteProduct('articleId');
  });

});
