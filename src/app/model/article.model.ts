export interface ArticleModel {
  Id?: string,
  name: string
  description: string,
  price: number,
  type?: string,
  Image: string;
  Image2?: string;
  category?: string,
}

export class FirebaseResponseModel {
  type: string;
  payload: {}

}
