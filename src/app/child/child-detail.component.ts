import { Component, OnInit, Input} from '@angular/core';
import { Child } from '../_models/child';
import { ChildService } from '../_services/index'

@Component({
  selector: 'child-detail',
  templateUrl: './child-detail.component.html',
  styleUrls: ['./child-detail.component.scss']
})
export class ChildDetailComponent implements OnInit {

  constructor(private cs: ChildService) { }

  ngOnInit() {
  }

}
