import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { Child, Zone } from '../../_models/index'
import { ChildService, ZoneService, DialogService} from '../../_services/index'
import { SelectItem } from 'primeng/primeng'
import { Dropdown } from 'primeng/components/dropdown/dropdown'
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})

export class ChildListComponent implements OnInit {
  zones: Zone[]
  currentZone: any
  allZone: any = {}
  showDelete: boolean = false
  children: Child[]

  @ViewChild('dropdown') dropdown: Dropdown

  constructor(
    private zs: ZoneService, 
    private ds: DialogService,
    private cs: ChildService,
    private router: Router
  ) { }

  ngOnInit() {
    this.allZone.label = "All"
    this.allZone.value = "all"
    this.loadZones().subscribe()
    this.loadChildren()
  }

  goToChild(id: number) {
    this.router.navigate(['/child-crud', id]);
  }

  loadZones(){
    return this.zs.getAll().map(result => {
      this.zones = result
      // Insert on top of array
      this.zones.unshift(this.allZone)
      // Set current zone to All
      this.currentZone = this.zones[0].value
    }, err => {
      this.zones.unshift(this.allZone)
    })
  }

  loadChildren(){
    return this.cs.getAll().subscribe(result =>{
      this.children = result
    })
  }

  createZone(){
    this.ds.newZone("Create Zone").subscribe(succ => {
      if(succ){
        let zone: any = {}
        // Set zone label to user input
        zone.label = succ
        // Create value by splitting the spaces
        // Capitalizing first letter 
        // Joining with '-'
        zone.value = succ.split(' ').map(section=>{
          return section.toLowerCase()
        }).join('-')

        this.zs.create(zone).subscribe(()=>{
          // Load zones after creating a new one to get the id of the new one
          this.loadZones().subscribe(() => {
            // Set currentZone to newly created zone
            this.currentZone = zone.value
            this.resetFilter()  
          })
        })
      }
    })
  }

  deleteZone(){
    let zone = this.findZone()
    if (zone.value !== "all"){
      this.ds.confirm("Delete Zone", `Are you sure you want to delete ${this.findZone().label}?`).subscribe(succ =>{
        if (succ){
          this.zs.delete(zone._id).subscribe(succ => {
            // Delete the deleted zone from the zones array
            this.zones = this.zones.filter(el => el.value !== zone.value)
            // Set the current zone to All which should be the first element in the zones array
            this.currentZone = this.zones[0].value
            this.resetFilter()  
          })  
        }
      })
    }
  }

  findZone(){
    // Find the zone element corresponding to the currentZone's value in the zones array
    return this.zones.filter(el => {
      // Return only the one where the value equals the current zone
      // Resulting in an array with only one element
      return el.value === this.currentZone
    })[0]
  }

  resetFilter(){
    // Show the delete button if All is not selected
    // Clear the serch input
    this.showDelete = this.findZone().value !== "all"
    this.dropdown.resetFilter()
  }

}
