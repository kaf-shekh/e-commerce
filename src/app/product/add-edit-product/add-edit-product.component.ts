import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  error = '';
  product: ProductModel;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.productService.getProduct(params.id).subscribe(data => {
          if (data.status === 'success') {
            this.product = data;
            this.setFormValue(this.product);
          } else {
            this.error = data.message;
          }
        });
      }
    }
    );
    this.initializeForm();
  }

  setFormValue(product: ProductModel) {
    this.form.controls.name.setValue(product.name);
    this.form.controls.price.setValue(product.price);
    this.form.controls.description.setValue(product.description);
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.f.name.setValue(this.f.name.value.trim());
    this.f.description.setValue(this.f.description.value.trim());

    if (this.form.invalid) { return; }
    this.productService.createProduct(this.form.value).subscribe(data => {
      if (data.status === "success") {
        this.submitted = false;
        this.error = '';
        this.router.navigate(['/']);
      } else {
        this.error = data.message;
      }
    });

  }
}
