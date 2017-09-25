import { Component, OnInit, Input } from '@angular/core';
import { Child } from '../../_models'
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.scss']
})
export class ChildCardComponent implements OnInit {

  @Input() child: Child

  constructor(
  ) { }

  ngOnInit() {
  }

}
