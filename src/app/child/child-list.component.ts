import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { Child, Zone } from '../_models/index'
import { ChildService, ZoneService} from '../_services/index'
import { SelectItem } from 'primeng/primeng'
import { Dropdown } from 'primeng/components/dropdown/dropdown'

@Component({
  selector: 'child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})

export class ChildListComponent implements OnInit {
  zones: SelectItem[] = [];
  currentZone: any;

  @ViewChild('dropdown') dropdown: Dropdown

  constructor(private cs: ChildService, private zs: ZoneService) { }

  ngOnInit() {
    this.loadZones()
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

  createZone(){

  }

  resetFilter(){
    this.dropdown.resetFilter()
  }

}
