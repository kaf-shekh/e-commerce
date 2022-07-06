import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app';
import { ArticleModel } from 'src/app/model/article.model';
import { fileType, FormControlObject, ImageFile } from 'src/app/model/Product-form.model';
import { ArticleService } from 'src/app/service/article.service';
import * as data from '../../../shared/form.json';
import { DELETE_ARTICLE, EDIT_ARTICLE } from '../store/actions/auth.actions';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  @Input() article: ArticleModel;
  @Output() close = new EventEmitter();

  articleForm: FormGroup;
  isSubmitted: boolean = false;
  Id: string;
  form: FormControlObject[] = (data as any).default;
  files: fileType[];
  ;
  error: string = '';
  reader = new FileReader();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateModel>,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleForm = this.fb.group({});
    this.createForm(this.form);
    this.articleForm.patchValue(this.article);
  }

  // create product Form
  private createForm(controls: FormControlObject[]): void {

    for (let control of controls) {
      const newFormControl = new FormControl();
      if (control.option.required) {
        newFormControl.setValidators(Validators.required);
        newFormControl.updateValueAndValidity()
      } else { }
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
  public clearImage(fieldName): void {
    this.articleForm.controls[fieldName].setValue(undefined);
  }

  public submit(): void {
    this.isSubmitted = true;

    if (this.articleForm.invalid) {
      return;
    } else {
      Object.assign(this.articleForm.value, { Id: this.article.Id })
      this.store.dispatch(new EDIT_ARTICLE(this.articleForm.value));
      // this.articleService.updateProduct(this.article.Id, this.articleForm.value);
      this.cancel();

    }
  }

  public cancel(): void {
    this.isSubmitted = false;
    this.close.emit()
    this.articleForm.reset();
  }

  public delete(): void {
    // this.store.dispatch(new DELETE_ARTICLE(this.article.Id));
    this.articleService.deleteProduct(this.article.Id);
    this.cancel();
  }

}
