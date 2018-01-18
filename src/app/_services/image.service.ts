import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Image } from '../_models/index'
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ChildImageService {
  constructor(
    private _http: HttpClient,
    private _sanitizer: DomSanitizer
  ) { }

  getById(_id: string) {
    return this._http.get('/api/images/children/' + _id, {responseType: 'blob'}).map(blob => {
      var urlCreator = window.URL;
      return this._sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
    })
  }

  create(formData: FormData): Observable<Image> {
    return this._http.post('/api/images/children', formData)
  }

  update(_id: string, formData: FormData) {
    return this._http.put('/api/images/children/' + _id, formData, { responseType: 'text' })
  }

  delete(_id: string) {
    return this._http.delete('/api/images/children/' + _id)
  }
}

@Injectable()
export class ArticleImageService {
  constructor(
    private _http: HttpClient,
    private _sanitizer: DomSanitizer
  ) { }

  getById(_id: string) {
    return this._http.get('/api/images/articles/' + _id, {responseType: 'blob'}).map(blob => {
      var urlCreator = window.URL;
      return this._sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
    })
  }

  create(formData: FormData): Observable<Image> {
    return this._http.post('/api/images/articles', formData)
  }

  update(_id: string, formData: FormData) {
    return this._http.put('/api/images/articles/' + _id, formData, { responseType: 'text' })
  }

  delete(_id: string) {
    return this._http.delete('/api/images/articles/' + _id, { responseType: 'text' })
  }
}