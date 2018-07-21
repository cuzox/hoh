import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Subject } from 'rxjs'

@Injectable()
export class AlertService {
  private subject = new Subject<any>()

  constructor() {
  }

  success(title = "", message = "") {
      this.subject.next({ severity: 'success', summary: title, detail: message })
  }

  warning(title = "", message = "") {
    this.subject.next({ severity: 'warn', summary: title, detail: message })
  }

  info(title = "", message = "") {
    this.subject.next({ severity: 'error', summary: title, detail: message })
  }

  error(title = "", message = "") {
    this.subject.next({ severity: 'error', summary: title, detail: message })
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable()
  }
}
