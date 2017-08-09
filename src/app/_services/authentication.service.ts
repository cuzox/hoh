import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    private loggedIn = false;
    private logger = new Subject<boolean>();

    constructor(private http: Http) { }

    isLoggedIn(): Observable<boolean> {
        return this.logger.asObservable();
    }

    isCurrentUser(){
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            return true;
        }
        return false;
    }

    idAdmin(){
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            if (currentUser.role === '010'){
                return true;
            }
        }
        return false;
    }

    login(email: string, password: string) {
        return this.http.post('/api/users/authenticate', { email: email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.loggedIn = true;
                    this.logger.next(this.loggedIn);
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedIn = false;
        this.logger.next(this.loggedIn);
    }
}
