import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index'
import { User } from '../_models/user';
import { appConfig } from '../app.config';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  appConfig: any;

  constructor(private us: UserService) {}
  
  ngOnInit() {
      this.appConfig = appConfig;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));    

      this.loadAllUsers();
  }

  deleteUser(user: User) {
      this.us.delete(user).subscribe(() => { this.loadAllUsers() });
  }

  private loadAllUsers() {
      this.us.getAll().subscribe(users => { this.users = users; });
  }

  private updateUserRole(user: User) {
    this.us.update(user).subscribe(()=> { this. loadAllUsers() });
  }

  checkUser(user: User){
    let isA = false;
    let isSA = false;
    if (user.role == this.appConfig.accessTypes.admin) isA = true;
    if (user.role == this.appConfig.accessTypes.super_admin) isSA = true;

    return {
      isA: isA,
      isSA: isSA
    }
  }
}
