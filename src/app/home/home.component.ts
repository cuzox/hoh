import { Child } from './../_models/child';
import { ChildService } from './../_services/child.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Timeouts } from 'selenium-webdriver';
declare var jquery:any;
declare var $ :any;

@Component({
   moduleId: module.id,
   templateUrl: 'home.component.html',
   styleUrls: ['./home.component.scss'],
  //  encapsulation: ViewEncapsulation.None
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
  scroll(direction){
    $('#scroll-X').stop()
    let parent = document.getElementById("scroll-X");
    if (direction=='left'){
      $('#scroll-X').animate({
        scrollLeft: parent.scrollLeft + parent.offsetWidth
      }, 500);
    }
    if (direction=='right'){
      $('#scroll-X').animate({
        scrollLeft: parent.scrollLeft - parent.offsetWidth
      }, 500);
    }
  }

}