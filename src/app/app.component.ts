import {Inject, Component, HostListener, ChangeDetectorRef, ViewEncapsulation} from '@angular/core'
import { User } from './_models/user'
import { AuthenticationService } from './_services/index'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  loggedIn: Boolean = false
  currentUser: User

  constructor (
    private as: AuthenticationService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit() {
    this.loggedIn = this.as.isCurrentUser()
    this.as.isLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn
    })
  }
}
