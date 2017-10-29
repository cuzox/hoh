import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { Headers, RequestOptions, Response } from '@angular/http'
import { HttpClient } from '@angular/common/http'


import { User } from '../_models/user'

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>('/api/users')
    }

    getById(_id: string): Observable<User> {
        return this.http.get('/api/users/' + _id)
    }

    create(user: User) {
        return this.http.post('/api/users/register', user)
    }

    update(user: User) {
        return this.http.put('/api/users/' + user._id, user)
    }

    delete(user: User) {
        return this.http.delete('/api/users/' + user._id, {responseType: "text"})
    }
}
