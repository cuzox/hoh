import { Component, OnInit, Input} from '@angular/core'
import { Child } from '../_models/child'
import { ChildService } from '../_services/index'

@Component({
  selector: 'child-crud',
  templateUrl: './child-crud.component.html',
  styleUrls: ['./child-crud.component.scss']
})
export class ChildCrudComponent implements OnInit {
  @Input() child: Child;

  constructor(private cs: ChildService) { }

  ngOnInit() {

  }

}
