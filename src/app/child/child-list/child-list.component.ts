import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { Child, Zone } from '../_models/index'
import { ChildService, ZoneService, DialogService} from '../_services/index'
import { SelectItem } from 'primeng/primeng'
import { Dropdown } from 'primeng/components/dropdown/dropdown'

@Component({
  selector: 'child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})

export class ChildListComponent implements OnInit {
  zones: SelectItem[] = []
  currentZone: any = {}
  zoneModel: any = {}

  @ViewChild('dropdown') dropdown: Dropdown

  constructor(
    private zs: ZoneService, 
    private ds: DialogService
  ) { }

  ngOnInit() {
    this.loadZones()
  }

  loadZones(){
    this.zs.getAll().subscribe(result => {
      this.zones = result
      }
    )
  }

  createZone(){
    this.ds.newZone("Create Zone").subscribe(succ => {
      if(succ){
        let zone: any = {}
        zone.label = succ
        zone.value = succ.split(' ').map(section=>{
          return section.toLowerCase()
        }).join('-')
        this.zs.create(zone).subscribe(()=>{
          this.zones.unshift(zone)
          this.currentZone = this.zones[0]
        })
      }
    })
  }

  resetFilter(){
    this.dropdown.resetFilter()
  }

}
