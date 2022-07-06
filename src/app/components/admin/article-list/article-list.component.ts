import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { ArticleModel } from '../../../model/article.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app';
import { ArticleList } from '../store/actions/auth.actions';
import { ArticleService } from 'src/app/service/article.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  list: ArticleModel[] = [];
  article: ArticleModel;
  modalRef?: BsModalRef;
  editMode: boolean = false;
  loading = true;
  constructor(
    public modalService: BsModalService,
    public store: Store<AppStateModel>,
    private articleService: ArticleService
  ) {

    this.store.dispatch(new ArticleList())
    this.getList();
  }

  public getList(): void {
    this.store.select('AdminState').select('articleList').subscribe((data: ArticleModel[]) => {
      if (data !== undefined) {
        this.list = data;
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {
  }

  //Open Modal
  public openModal(template: TemplateRef<ElementRef>, element?: ArticleModel): void {
    this.article = element;
    this.modalRef = this.modalService.show(template, Object.assign({ backdrop: 'static', class: 'modal-lg bg-blue' }));
  }

  public closeModal(): void {
    this.modalRef.hide();
  }

}
