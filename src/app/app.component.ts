import {Inject, Component, HostListener, ChangeDetectorRef} from '@angular/core';
import { User } from './_models/user';
import { AuthenticationService } from './_services/index';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { 
  loggedIn: Boolean = false;
  currentUser: User;
  fixedNav: boolean = false;

  constructor (
    private as: AuthenticationService, 
    private cdr: ChangeDetectorRef, 
    @Inject(DOCUMENT) private document: any
  ){}

  ngOnInit() {
    this.loggedIn = this.as.isCurrentUser();
    this.as.isLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      this.cdr.detectChanges();
    });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = this.document.body.scrollTop;
    if ( !this.fixedNav && number > 67  ){
      this.document.getElementById('swanky-nav').style.top = '-200px';
    }
    if (number > 200) {
      this.fixedNav = true;
      this.document.getElementById('swanky-nav').style.top = '0px';
      this.document.body.style.paddingTop =  '67px';
    } else if (this.fixedNav && number === 0) {
      this.document.body.style.paddingTop = '0px';
      this.fixedNav = false;
    }
  }
}
