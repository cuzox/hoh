import { Image } from './../_models/image';
import { SpinnerService } from 'angular-spinners';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Child } from '../_models/child'
import 'rxjs/add/operator/switchMap'

@Injectable()
export class ChildService {
    constructor(
        private _http: HttpClient,
        private _is: ImageService,
        private _ss: SpinnerService
    ) { }

    getAll(): Observable<Child[]> {
        return this._http.get<Child[]>('/api/children')
    }

    getById(_id: string): Observable<Child> {
        return this._http.get('/api/children/' + _id)
    }

    create(child: Child) {
        return this._http.post('/api/children', child)
    }

    createWithPic(child: Child, image: File) {
        let formData = new FormData();  
        formData.append('childPhoto', image, image.name)
        return this._is.create(formData).switchMap(res => {
            child.imageId = res._id
            return this.create(child)
        }, err => {
            console.log('Error uploading image', err)
        })
    }

    update(child: Child) {
        return this._http.put('/api/children/' + child._id, child, {responseType: 'text'})
    }

    updateWithPic(child: Child, image: File) {
        let formData = new FormData();
        formData.append('childPhoto', image, image.name)
        if(child.imageId){
            return this._is.update(child.imageId, formData).switchMap(res => {
                console.log('res uploading image', res)
                return this.update(child)
            }, err => {
                console.log('Error uploading image', err)
            })
        } else {
            return this._is.create(formData).switchMap(res => {
                child.imageId = res._id
                return this.update(child)
            }, err => {
                console.log('Error uploading image', err)
            })
        }
    }

    delete(_id: string) {
        return this._http.delete('/api/children/' + _id, { responseType: 'text' })
    }
}
