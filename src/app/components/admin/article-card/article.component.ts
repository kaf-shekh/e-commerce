import { Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ArticleModel } from 'src/app/model/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article: ArticleModel;
  @Input() editMode: boolean;
  modalRef?: BsModalRef;
  isEdit: boolean;
  color: string;

  constructor(
    public modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.color = this.getColor();
  }

  //Open Modal
  public openModal(template: TemplateRef<ElementRef>, element?: ArticleModel, value?: boolean): void {
    this.isEdit = value;
    this.article = element;
    this.modalRef = this.modalService.show(template, Object.assign({ backdrop: 'static', class: 'modal-lg bg-blue' }));
  }

  public closeModal(): void {
    this.modalRef.hide();
  }

  private getColor() {
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    };
    return color
  }

}
