import { Child } from './../_models/child';
import { ChildService } from './../_services/child.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core'

@Component({
   moduleId: module.id,
   templateUrl: 'home.component.html',
   styleUrls: ['./home.component.scss'],
   encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  children: Child[]
  constructor(
    private _cs: ChildService
  ) {

  }

  ngOnInit() {
    this._cs.getAll().subscribe(children =>{
      this.children = children
    })
  }

}