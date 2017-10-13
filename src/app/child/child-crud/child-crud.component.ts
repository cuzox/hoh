import { Component, OnInit, Input, ViewChild, ViewEncapsulation} from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormControl } from '@angular/forms'
import { AlertService, ChildService } from '../../_services/index'
import { Child } from '../../_models/child'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'child-crud',
  templateUrl: './child-crud.component.html',
  styleUrls: ['./child-crud.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildCrudComponent implements OnInit {
  model: Child
  loading = false
  title: string
  childParam: any
  theChild: any
  token: any

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
    this.token = JSON.parse(localStorage.getItem('currentUser')).token
  }
  
  create() {
      this.loading = true
      this.cs.create(this.model).subscribe( success, error )

      function success(success){
        this.alertService.success('Child creation successful', true)
      }

      function error(error){
        this.alertService.error(error)
        this.loading = false      
      }
  }

  upload(){

  }

}
