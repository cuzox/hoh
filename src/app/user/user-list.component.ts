import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index'
import { User } from '../_models/user';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private us: UserService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));    
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  deleteUser(_id: string) {
      this.us.delete(_id).subscribe(() => { this.loadAllUsers() });
  }

  private loadAllUsers() {
      this.us.getAll().subscribe(users => { this.users = users; });
  }

}
