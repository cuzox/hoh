import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Child } from '../_models/child'

@Injectable()
export class ChildService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<Child[]> {
        return this.http.get<Child[]>('/api/children')
    }

    getById(_id: string): Observable<Child> {
        return this.http.get('/api/children/' + _id)
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
