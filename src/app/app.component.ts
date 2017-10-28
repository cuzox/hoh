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
        transform: 'translateY(-100%)'
      })),
      state('slideDown', style({
        transform: 'translateY(0)'
      })),
      transition('* => *', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})

export class AppComponent {
  sliding = 'slideUp';
  loggedIn: boolean = false
  currentUser: User
  isAdmin: boolean = false

  sub = new Array()

  constructor (
    private _as: AuthenticationService,
  ){}
  toggleSlide(){
    console.log('toggle');
    this.sliding == 'slideUp' ? this.sliding = 'slideDown' : this.sliding = 'slideUp';
  }
  ngOnInit() {
    let sub = this._as.isLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn
    })

    let sub2 = this._as.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin
    })

    this.sub.push(sub)
    this.sub.push(sub2)
  }

  ngOnDestroy(){
    this.sub.forEach((sub: any)=>{
      sub.unsubscribe()
    })
  }
}
