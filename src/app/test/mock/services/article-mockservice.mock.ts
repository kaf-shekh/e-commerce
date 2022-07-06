import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ArticleModel } from "src/app/model/article.model";

export class FireStoreMock {

  articleList: ArticleModel[] = [
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
  article: ArticleModel = {
    Image: "Image1",
    Image2: "Image2",
    category: "Shirt",
    description: "Care Instructions: First Time Dry-Clean followed by hand wash Fit Type: Regular Fit Care Instructions: Do not Bleach, Normal Machine Wash Or Hand Wash Ideal for : Shirts men , Size : S , M , L , XL , XXL casual shirts Fit : Slim fit shirts for men , Sleeve : Shirt for men full sleeves Pattern : Solid plain shirt man , Event : Casual shirts Fabric : Cotton shirt for man , Gender : Shirts for men",
    name: "MOONVELLY Men's Slim Fit Stylish Full Sleeve Shirts",
    price: 399.00,
    type: "B",
    Id: '12342'
  };
  constructor() { }

  // Get All Product
  public getProduct() {
    return of(this.articleList);
  }

  // Add Product
  public createProduct(product: ArticleModel) {
  }

  // Update Product
  public updateProduct(id: string, product: ArticleModel) {
  }

  // get Product bvy id
  public getProductById(id: string) {

    return of(this.article);
  }

  // delete Product
  deleteProduct(productId: string) {
  }


}
