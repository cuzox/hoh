import { Inject, Component, HostListener, ViewEncapsulation } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { User } from './_models/user'
import { AuthenticationService } from './_services/index'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slide', [
      state('slideUp', style({
        transform: 'translateX(100%)'
      })),
      state('slideDown', style({
        transform: 'translateX(0)',
      })),
      transition('* => *', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})

export class AppComponent {
  sliding = 'slideUp'
  menu = false
  loggedIn = false
  currentUser: User
  isAdmin = false

  sub = new Array()

  constructor (
    private _as: AuthenticationService,
  ) {
    document.addEventListener('click', () => this.closeMenu(), false)
  }
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
      this.loggedIn = true

      if (user.role === 2 || user.role === 4) {
        this.isAdmin = true
      }
    }

    let sub = this._as.isLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn
    })

    let sub2 = this._as.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin
    })

    this.sub.push(sub)
    this.sub.push(sub2)
  }

  toggleSlide() {
    if (this.sliding === 'slideUp') {
      this.sliding = 'slideDown'
    } else {
      this.sliding = 'slideUp'
    }
  }

  closeMenu() {
    if ( this.menu === true) {
      this.sliding = 'slideUp'
      this.menu = false
    }
  }
  menuOpen(event) {
    if ( event.toState === 'slideDown' ) {
      this.menu = true
    }
  }
  ngOnDestroy() {
    this.sub.forEach((sub: any) => {
      sub.unsubscribe()
    })
  }
}
