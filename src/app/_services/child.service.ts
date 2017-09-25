import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Child } from '../_models/child'

@Injectable()
export class ChildService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/children').map((response: Response) => response.json())
    }

    getById(_id: string) {
        return this.http.get('/api/children/' + _id).map((response: Response) => response.json())
    }

    create(child: Child) {
        return this.http.post('/api/children', child)
    }

    update(child: Child) {
        return this.http.put('/api/children/' + child._id, child)
    }

    delete(_id: string) {
        return this.http.delete('/api/children/' + _id)
    }
}
