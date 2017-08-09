import { Component, OnInit, Input } from '@angular/core'
import { Child } from '../_models/child'
import { ChildService } from '../_services/index'

@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Input() child: Child

  constructor(
    private cs: ChildService
  ) {}

  ngOnInit() {

  }

}
