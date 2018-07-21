import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private loggedIn = false
  private admin = false
  private logger = new Subject<boolean>()
  private adminLogger = new Subject<boolean>()


  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable()
  }

  isAdmin(): Observable<boolean> {
    return this.adminLogger.asObservable()
  }


  login(email: string, password: string) {
    return this.http.post('/api/users/authenticate', { email: email, password: password }).pipe(map((user: any) => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.loggedIn = true
        this.logger.next(this.loggedIn)

        if (user.role === 2 || user.role === 4) {
          this.admin = true
          this.adminLogger.next(this.admin)
        }
      }

      return user
    }))
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser')
    this.loggedIn = false
    this.logger.next(this.loggedIn)

    this.admin = false
    this.adminLogger.next(this.admin)
  }
}
