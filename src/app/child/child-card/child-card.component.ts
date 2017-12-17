import { ChildImageService } from './../../_services/image.service';
import { Component, OnInit, Input } from '@angular/core';
import { Child } from '../../_models'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.scss']
})
export class ChildCardComponent implements OnInit {

  @Input() child: Child

  src: any = "/assets/images/no-image.png"
  zoneLabel: string = ""
  asAdmin: Boolean = false;

  constructor(
    private _cis: ChildImageService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (this._router.url.includes("admin")) this.asAdmin = true
    this.child.age = this.calculateAge(this.child.dob)
    this.child.zone.split('-').forEach(el => {
      this.zoneLabel += el.charAt(0).toUpperCase() + el.slice(1) + " "
    })
    if (this.child.imageId){
      this._cis.getById(this.child.imageId).subscribe(image => {
        this.src = image
      })
    }
  }

  calculateAge(birthday) {
    var ageDifMs = Date.now() - new Date(birthday).getTime()
    var ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

}
