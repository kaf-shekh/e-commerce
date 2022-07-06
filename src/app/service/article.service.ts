import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ArticleModel } from '../model/article.model';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private firestore: AngularFirestore) {

  }
  // Get All Product
  public getProduct() {
    return this.firestore.collection<ArticleModel>('product').snapshotChanges();
  }

  public getAllPorduct() {
  }

  // Add Product
  public async createProduct(product: ArticleModel) {
    return await this.firestore.collection<ArticleModel>('product').add(product);
  }

  // Update Product
  public updateProduct(id: string, product: ArticleModel): void {
    this.firestore.doc<ArticleModel>('product/' + id).update(product);
  }

  // get Product bvy id
  public async getProductById(id: string) {
    // return this.firestore.collection('product').doc(Id).get();
    // return this.firestore.doc<ArticleModel>('articles/' + id).snapshotChanges()
    return await this.firestore.collection<ArticleModel>('product').doc(id).valueChanges()
    // return this.firestore.object<ArticleModel>('product/' + id).snapshotChanges();
  }

  // delete Product
  deleteProduct(productId: string): void {
    this.firestore.doc<ArticleModel>('product/' + productId).delete();
  }

  // async formdata() {
  //   return await this.firestore.collection('form').snapshotChanges();
  // }
  getData(data: any) {
    return data.map(e => {
      return {
        Id: e.payload.doc.id,
        ...e.payload.doc.data()
      } as ArticleModel;
    })
  }
}


