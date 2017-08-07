import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_models/user';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get('/api/users').map((response: Response) => response.json());
    }
 
    getById(_id: string) {
        return this.http.get('/api/users/' + _id).map((response: Response) => response.json());
    }
 
    create(user: User) {
        return this.http.post('/api/users/register', user);
    }
 
    update(user: User) {
        return this.http.put('/api/users/' + user._id, user);
    }
 
    delete(user: User) {
        return this.http.delete('/api/users/' + user._id);
    }
}