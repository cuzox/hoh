import { Component, OnInit, Input } from '@angular/core';
import { Child } from '../_models/child';
import { ChildService } from '../_services/index'

@Component({
  selector: 'child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent implements OnInit {
  @Input() child: Child;

  constructor(private cs: ChildService) { }

  ngOnInit() {
  }

}
