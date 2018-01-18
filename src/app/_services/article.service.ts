import { appConfig } from './../app.config';
import { Image } from './../_models/image';
import { SpinnerService } from 'angular-spinners';
import { ArticleImageService } from './image.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Article } from '../_models/article'
import { Base64ToBlobService as GetBlob } from 'app/_services';
import { Observable } from 'rxjs';

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

  create(article: Article): Observable<Article> {
    return this._http.post<Article>('/api/articles', article)
  }

  update(article: Article): Observable<String> {
    return this._http.put('/api/articles/' + article._id, article, { responseType: 'text' })
  }


  delete(_id: string): Observable<String> {
    return this._http.delete('/api/articles/' + _id, { responseType: 'text' })
  }
}
