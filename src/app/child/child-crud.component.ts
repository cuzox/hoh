import { Component, OnInit, Input} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormControl } from '@angular/forms'
import { AlertService, ChildService } from '../_services/index'
import { Child } from '../_models/child'

@Component({
  selector: 'child-crud',
  templateUrl: './child-crud.component.html',
  styleUrls: ['./child-crud.component.scss']
})
export class ChildCrudComponent implements OnInit {
  model: Child
  loading = false

  @Input() child: Child

  constructor(
    private cs: ChildService,
    private router: Router,
    private alertService: AlertService
  ) { }

  create() {
      this.loading = true
      this.cs.create(this.model).subscribe(
        data => {
            this.alertService.success('Child creation successful', true)
            this.router.navigate(['/login'])
        },
        error => {
            this.alertService.error(error)
            this.loading = false
        }
      )
  }

  ngOnInit() {

  }

}
