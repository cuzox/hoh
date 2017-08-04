import { Component, OnInit } from '@angular/core';
import { ChildService, UserService } from '../_services/index'

@Component({
  selector: 'admin-panel',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private cs: ChildService, private us: UserService) { }

  ngOnInit() {
    
  }

}
