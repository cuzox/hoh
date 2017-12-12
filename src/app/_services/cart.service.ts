import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

import { Cart } from '../_models/cart'

@Injectable()
export class CartService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>('/api/carts')
  }

  getById(_id: string): Observable<Cart> {
    return this.http.get('/api/carts/' + _id)
  }

  create(): Observable<Cart> {
    return this.http.post('/api/carts', {})
  }

  updateAdd(_id: string, childId: string): Observable<String> {
    return this.http.put('/api/carts/' + _id + '/add' + childId, {}, {responseType: 'text'})
  }

  updateRm(_id: string, childId: string): Observable<String> {
    return this.http.put('/api/carts/' + _id + '/remove' + childId, {}, {responseType: 'text'})
  }

  delete(_id: string): Observable<String> {
    return this.http.delete('/api/carts/' + _id, {responseType: 'text'})
  }
}
