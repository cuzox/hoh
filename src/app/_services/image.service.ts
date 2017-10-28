import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Image } from '../_models/index'

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) { }

  getById(_id: string): Observable<Image> {
    return this.http.get('/api/images/' + _id)
  }

  create(formData: FormData) {
    return this.http.post('/api/images', formData)
  }

  update(image: Image) {
    return this.http.put('/api/images/' + image._id, image)
  }

  delete(_id: string) {
    return this.http.delete('/api/images/' + _id)
  }
}
