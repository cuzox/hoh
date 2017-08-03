import { Component, ChangeDetectorRef } from '@angular/core';
import { User } from './_models/user';
import { AuthenticationService } from './_services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { 
  loggedIn: Boolean = false;
  currentUser: User;

  constructor (private AS: AuthenticationService, private cdr: ChangeDetectorRef){}

  ngOnInit() {
    this.AS.isLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      this.cdr.detectChanges();
    });
  }
}
