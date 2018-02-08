import { Component, OnInit } from '@angular/core'
import { AlertService } from '../_services/alert.service'
import { Message } from 'primeng/components/common/message';

@Component({
   selector: 'alert',
   templateUrl: 'alert.component.html'
})

export class AlertComponent {
  messages: Message[] = []
  lifetime: number = 1200;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      if(message){
        this.messages = []
        this.messages.push(message)
      }
    })
  }
}