import { appConfig } from './../app.config';
import { Image } from './../_models/image';
import { SpinnerService } from 'angular-spinners';
import { ArticleImageService } from './image.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Article } from '../_models/article'
import { Base64ToBlobService as GetBlob } from 'app/_services';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ArticleService {
  constructor(
    private _http: HttpClient,
    private _ais: ArticleImageService,
    private _ss: SpinnerService
  ) { }

  getAll(): Observable<Article[]> {
    return this._http.get<Article[]>('/api/articles')
  }

  getById(_id: string): Observable<Article> {
    return this._http.get<Article>('/api/articles/' + _id)
  }

  create(article: Article, image?: File): Observable<Article>{
    var upload = (article: Article): Observable<Article> => this._http.post<Article>('/api/articles', article)

    if (!image) return upload(article)

    let formData = new FormData();  
    formData.append('articlePhoto', image, image.name)
    return this._ais.create(formData).switchMap((res: Image) => {
      article.imageId = res._id
      return upload(article)
    })
  }

  update(_id: string, data: any): Observable<String> {
    return this._http.put('/api/articles/' + _id, data, { responseType: 'text' })
  }


  delete(_id: string): Observable<String> {
    return this._http.delete('/api/articles/' + _id, { responseType: 'text' })
  }
}
