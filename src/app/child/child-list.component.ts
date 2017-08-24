import { Component, OnInit, Input } from '@angular/core'
import { Child } from '../_models/child'
import { ChildService, ZoneService} from '../_services/index'
import {MdSelectModule} from '@angular/material';

@Component({
  selector: 'child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent implements OnInit {
  zones: string[] = [];

  @Input() child: Child

  constructor(private cs: ChildService, private zs: ZoneService) { }

  ngOnInit() {
    this.loadZones();
  }

  loadZones(){
    this.zs.getAll().subscribe(
      result => {
        this.zones = result;
      },
      error => {
        // Handle
      }
    )
  }

}
