import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Zone } from '../_models/zone';

@Injectable()
export class ZoneService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/zones').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/api/zones/' + _id).map((response: Response) => response.json());
    }

    create(zone: Zone) {
        return this.http.post('/api/zones', zone);
    }

    update(zone: Zone) {
        return this.http.put('/api/zones/' + zone._id, zone);
    }

    delete(_id: string) {
        return this.http.delete('/api/zones/' + _id);
    }
}
