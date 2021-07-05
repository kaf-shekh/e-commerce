import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/model/product';
import { environment } from 'src/environments/environment';
import { TCRUDServices } from './t_Crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends TCRUDServices {

  /**
   * Constructor
   * @param http instance of HTTP Client
   */
  constructor(private http: HttpClient) {
    super(http);
  }

  /**
   * Get all Product
   */
  getAllProduct() {
    return this.getWrapper(`${environment.apiUrl}`);
  }

  /**
   * Create  Product
   */
  createProduct(data: any) {
    console.log(data);
    return this.postWrapper(`${environment.apiUrl}`, data);
  }

  /**
   * Delete Product
   * @param id is id of delete product
   */
  deleteProduct(id: number) {
    return this.deleteWrapper(`${environment.apiUrl}/${id}`);
  }

  /**
 * Edit Product
 * @param id is id of product
 * @param formData is element of product
 */
  modifyProduct(id: number, formData: ProductModel) {
    return this.putWrapper(`${environment.apiUrl}/${id}`, formData);
  }

  /**
   * Get Product by id
   * @param id is id of proudct
   */
  getProduct(id: number) {
    return this.getWrapper(`${environment.apiUrl}/${id}`);
  }
}
