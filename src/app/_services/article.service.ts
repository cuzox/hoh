import { Image } from './../_models/image';
import { SpinnerService } from 'angular-spinners';
import { ArticleImageService } from './image.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Article } from '../_models/article'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/forkJoin'

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
    return this._http.get('/api/articles/' + _id)
  }

  create(article: Article): Observable<Article> {
    return this._http.post('/api/articles', article)
  }

  // createWithPic(article: Article, images: File[]) {
  //   let imgObservableArray = []
  //   images.forEach(image => {
  //     let formData = new FormData();
  //     formData.append('articlePhoto', image, image.name)
  //     imgObservableArray.push( this._is.create(formData).map(img => img._id))
  //   })
  //   return Observable.forkJoin(imgObservableArray).switchMap((imgIdArray: string[]) => {
  //     article.images = imgIdArray
  //     return this.create(article)
  //   }, err => {
  //     console.log('Error uploading image', err)
  //   })
  // }

  update(article: Article): Observable<String> {
    return this._http.put('/api/articles/' + article._id, article, { responseType: 'text' })
  }

  // updateWithPic(article: Article, image: File) {
  //   let formData = new FormData();
  //   formData.append('articlePhoto', image, image.name)
  //   if (article.imageId) {
  //     return this._is.update(article.imageId, formData).switchMap(res => {
  //       console.log('res uploading image', res)
  //       return this.update(article)
  //     }, err => {
  //       console.log('Error uploading image', err)
  //     })
  //   } else {
  //     return this._is.create(formData).switchMap(res => {
  //       article.imageId = res._id
  //       return this.update(article)
  //     }, err => {
  //       console.log('Error uploading image', err)
  //     })
  //   }
  // }

  delete(_id: string) {
    return this._http.delete('/api/articles/' + _id, { responseType: 'text' })
  }
}
