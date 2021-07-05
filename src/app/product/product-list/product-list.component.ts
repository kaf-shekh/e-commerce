import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: ProductModel[];
  error = '';

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.productService.getAllProduct().subscribe(data => {
      if (data.status === 'success') {
        this.products = data;
      } else {
        this.error = data.message;
      }
    });
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(data => {
      if (data.status === 'success') {
        this.router.navigate(['/']);
      } else {
        this.error = data.message;
      }
    })
  }

}
