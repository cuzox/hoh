import { SpinnerService } from 'angular-spinners';
import { Observable } from 'rxjs/Observable';
import { Child } from './../../_models/child';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChildService, ChildImageService } from 'app/_services';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ChildDetailsComponent implements OnInit {
  childParam: Observable<Child>
  childPhotoSrc: String = "/assets/images/no-image.png"
  asAdmin: Boolean = false
  model: Child
  zoneLabel: String = ""

  constructor(
    private _cs: ChildService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _ss: SpinnerService,
    private _cis: ChildImageService
  ) { }

  ngOnInit() {
    this.childParam = this._route.paramMap.switchMap((params: ParamMap) =>
      this._cs.getById(params.get('id'))
    );
    if (this._router.url.includes("admin")) this.asAdmin = true
    setTimeout(()=>{
      this.model.zone.split('-').forEach(el => {
        this.zoneLabel += el.charAt(0).toUpperCase() + el.slice(1) + " "
      })
      console.log(this.model)
      if (this.model.imageId) {
        this._ss.show('realSpinner');
        this._cis.getById(this.model.imageId).subscribe(src => {
          this.childPhotoSrc = <string>src
          this._ss.hide('realSpinner');
        })
      }
    })
  }

}
