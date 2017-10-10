import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

import { Zone } from '../_models/zone'

@Injectable()
export class ZoneService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<Zone[]> {
        return this.http.get<Zone[]>('/api/zones')
    }

    getById(_id: string): Observable<Zone> {
        return this.http.get('/api/zones/' + _id)
    }

    create(zone: Zone) {
        return this.http.post('/api/zones', zone)
    }

    update(zone: Zone) {
        return this.http.put('/api/zones/' + zone._id, zone)
    }

    delete(_id: string) {
        return this.http.delete('/api/zones/' + _id)
    }
}
