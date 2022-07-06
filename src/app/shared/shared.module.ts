import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailComponent } from '../components/admin/article-detail/article-detail.component';
import { AddArticleComponent } from '../components/admin/add-article/add-article.component';
import { EditArticleComponent } from '../components/admin/edit-article/edit-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticleDetailComponent,
    AddArticleComponent,
    EditArticleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ArticleDetailComponent, AddArticleComponent,
    EditArticleComponent,ReactiveFormsModule,FormsModule]
})
export class SharedModule { }
