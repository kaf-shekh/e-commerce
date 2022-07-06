import { ArticleModel } from "src/app/model/article.model";

export class EffectAddModel {
  payload: ArticleModel;
  type: string;
}
export class EffectListModel {
  payload: ArticleModel[];
  type: string;
}

export class EffectEditModel {
  payload: ArticleModel;
  type: string;
}

export class EffectDeleteModel {
  payload: string;
  type: string;
}
