import { Component, OnInit } from '@angular/core';
import { ChildService } from '../_services/index'
import { User, Child } from '../_models/index';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[];
  children: Child[];
  tabs: any;

  constructor(private cs: ChildService) { 
    this.tabs = [
      {
        route: "children",
        label: "Children"
      },
      {
        route: "users",
        label: "Users"
      }
    ];
  }
    
  ngOnInit() {

  }
}
