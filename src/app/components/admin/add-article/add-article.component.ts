import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fileType, FormControlObject, ImageFile } from 'src/app/model/Product-form.model';
import * as data from '../../../shared/form.json';
import { ADD_ARTICLE } from '../store/actions/auth.actions';
import { AdminState } from '../store/reducers/auth.reducers';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  @Output() close = new EventEmitter();

  articleForm: FormGroup;
  isSubmitted = false;
  from: FormControlObject[] = (data as any).default;
  error: string = '';
  reader = new FileReader();
  files: fileType[];

  constructor(
    private fb: FormBuilder,
    private store: Store<AdminState>) { }

  ngOnInit(): void {
    this.articleForm = this.fb.group({});
    this.createForm(this.from);
  }

  // create product Form
  private createForm(controls: FormControlObject[]): void {

    for (let control of controls) {
      const newFormControl = new FormControl();
      if (control.option.required) {
        newFormControl.setValidators(Validators.required);
        newFormControl.updateValueAndValidity()
      }
      this.articleForm.addControl(control.key, newFormControl)
    }
  }

  public handleFileInput(evt: ImageFile, value: string): void {
    // 2000000 bytes = 2mb
    if (evt.target.files[0].size > 2000000) {
      this.error = 'size should be less 2mb';
      return;
    } else if (evt.target.files[0].type !== "image/jpeg" && evt.target.files[0].type !== "image/png") {
      this.error = 'suport only jpeg or png file';
      return;
    } else {
      this.error = '';
    }

    this.files = evt.target.files; // FileList object
    this.renderFile(value);
  }

  renderFile(value: string) {
    // Loop through the FileList and render image files as thumbnails.
    if (this.files[0].lastModified !== undefined) {
      for (var i = 0, f; f = this.files[i]; i++) {

        // Closure to capture the file information.
        this.reader.onload = function (e: any): void {
          addImage(e.target.result);
        };
        this.reader.readAsDataURL(f);
      }
      const addImage = (imgData: string) => {
        this.articleForm.controls[value].setValue(imgData);
      }
    }
  }

  // remove Image
  public clearImage(fieldName: string): void {
    this.articleForm.controls[fieldName].setValue(undefined);
  }

  public submit(): void {
    this.isSubmitted = true;

    if (this.articleForm.invalid) {
      return;
    } else {
      this.store.dispatch(new ADD_ARTICLE(this.articleForm.value))
      // this.articleService.createProduct(this.articleForm.value);
      this.cancel();
    }
  }

  public cancel(): void {
    this.isSubmitted = false;
    this.close.emit();
    this.articleForm.reset();
  }

}
