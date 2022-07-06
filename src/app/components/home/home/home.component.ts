import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ArticleModel } from 'src/app/model/article.model';
import * as data from '../../../shared/form.json';
import * as AOS from 'aos';
import { Store } from '@ngrx/store';
import { Aritlce_Success, HomePage } from '../store/actions/auth.actions';
import { FormControlObject } from 'src/app/model/Product-form.model';
import { HomeState } from '../store/reducers/auth.reducers';
import { AppState } from 'src/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles: ArticleModel[] = [];

  categoryList: [ArticleModel[]] = [[]];
  currentList: ArticleModel[] = [];
  modalRef?: BsModalRef;

  article: ArticleModel;
  loading = false;
  titles = [];

  form: FormControlObject = (data as any).default;

  noWrapSlides = false;
  showIndicator = true;
  index = 0;

  clicked = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    // animateIn: 'fadeIn',
    slideTransition: 'linear-gradient(to top,rgba(4,4,4,.65),rgba(54,54,54,.2))',
    animateOut: 'fadeOut',
    smartSpeed: 2000,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 1
      },
      1000: {
        items: 1,
      }
    },
    nav: false
  }
  Options: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 30,
    navSpeed: 700,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    lazyLoad: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  constructor(
    public modalService: BsModalService,
    public store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.checkUser();

  }

  checkUser() {
    this.store.dispatch(new HomePage());
    this.getData();
  }

  public getArray(list?: ArticleModel[]): void {
    this.categoryList = [[]];
    this.titles = [];
    for (var i in this.form[3].option.list) {
      this.currentList = list.filter((x: ArticleModel) => x.category === this.form[3].option.list[i]);
      if (this.currentList.length !== 0) {
        this.categoryList.push(this.currentList);
        this.titles.push({
          name: this.form[3].option.list[i],
          selected: this.titles.length !== 0 ? false : true,
        });
      }
    }
  }

  //Open Modal
  public openModal(template: TemplateRef<ElementRef>, element: ArticleModel): void {
    this.article = element;
    this.modalRef = this.modalService.show(template, Object.assign({ backdrop: 'static', class: 'modal-md bg-blue' }));
  }

  public closeModal(): void {
    this.modalRef.hide();
  }

  public selectTab(index: number): void {
    this.index = index + 1;
    this.clicked = true;
    this.titles.map(x => {
      x.selected = false;
    });
    this.titles[index].selected = true;
    AOS.refreshHard();
    this.clicked = false;
  }

  public getData(): void {
    this.store.select('HomeState').subscribe((articleList: HomeState) => {
      if (articleList !== undefined && articleList !== null) {
        this.articles = articleList.articles
        if (this.articles.length !== 0) {
          this.getArray(this.articles);
        }
        this.loading = articleList.loading;
        AOS.init({
          once: true,
          easing: 'ease-in-out'
        });
      }

    }
    )
  }
}
