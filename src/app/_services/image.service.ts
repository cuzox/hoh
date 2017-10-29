import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Image } from '../_models/index'
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ImageService {
  constructor(
    private _http: HttpClient,
    private _sanitizer: DomSanitizer
  ) { }

  getById(_id: string) {
    return this._http.get('/api/images/' + _id, {responseType: 'blob'}).map(blob => {
      var urlCreator = window.URL;
      return this._sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
    })
  }

  create(formData: FormData): Observable<Image> {
    return this._http.post('/api/images', formData)
  }

  update(image: Image) {
    return this._http.put('/api/images/' + image._id, image)
  }

  delete(_id: string) {
    return this._http.delete('/api/images/' + _id)
  }
}
