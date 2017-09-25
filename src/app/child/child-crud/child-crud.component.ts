import { Component, OnInit, Input} from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormControl } from '@angular/forms'
import { AlertService, ChildService } from '../../_services/index'
import { Child } from '../../_models/child'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'child-crud',
  templateUrl: './child-crud.component.html',
  styleUrls: ['./child-crud.component.scss']
})
export class ChildCrudComponent implements OnInit {
  model: Child
  loading = false
  title: string
  childParam: any;
  theChild: any;

  @Input() child: Child

  constructor(
    private alertService: AlertService,
    private cs: ChildService,
    private route: ActivatedRoute
  ) { }

  
  ngOnInit() {
    this.theChild = this.child || this.theChild
    this.childParam = this.route.paramMap.switchMap((params: ParamMap) => 
      this.cs.getById(params.get('id'))
    );
  }
  
  create() {
      this.loading = true
      this.cs.create(this.model).subscribe(
        data => {
            this.alertService.success('Child creation successful', true)
        },
        error => {
            this.alertService.error(error)
            this.loading = false
        }
      )
  }
}
