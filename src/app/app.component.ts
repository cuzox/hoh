import {Inject, Component, HostListener, ChangeDetectorRef, ViewEncapsulation} from '@angular/core'
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
        transform: 'translateY(-100%)',
        display: 'none'
      })),
      state('slideDown', style({
        transform: 'translateY(0)',
        display: 'flex'
      })),
      transition('* => *', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})

export class AppComponent {
  sliding = 'slideUp';
  loggedIn: Boolean = false
  currentUser: User

  constructor (
    private as: AuthenticationService,
    private cdr: ChangeDetectorRef
  ){}
  toggleSlide(){
    console.log('toggle');
    this.sliding == 'slideUp' ? this.sliding = 'slideDown' : this.sliding = 'slideUp';
  }
  ngOnInit() {
    this.loggedIn = this.as.isCurrentUser()
    this.as.isLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn
    })
  }
}
