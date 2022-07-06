import { ArticleModel } from "src/app/model/article.model";

export class EffectArticleList {
  payload: ArticleModel[];
  type: string;
}

export class ErrorOccur {
  message: string;
}
