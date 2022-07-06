import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleModel } from 'src/app/model/article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  @Input() article: ArticleModel;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

 public modalClose():void {
    this.close.emit();
  }

}
