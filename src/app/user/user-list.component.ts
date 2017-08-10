import { Component, OnInit } from '@angular/core'
import { UserService, DialogService } from '../_services/index'
import { User } from '../_models/user'
import { appConfig } from '../app.config'

const permissions = {
  admin: [
    'Add, edit, and remove Children',
    'Add, edit, and remove Zones',
    'Make someone else Admin'
  ],
  super_admin: [
    'Add, edit, and remove Children',
    'Add, edit, and remove Zones',
    'Remove Users',
    'Make someone else Admin',
    'Make someone else Super Admin'
  ],

}

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  currentUser: User
  users: User[] = []
  appConfig: any
  result: any

  constructor(private us: UserService, private ds: DialogService) {}

  ngOnInit() {
      this.appConfig = appConfig
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))

      this.loadAllUsers()
  }

  deleteUser(user: User, title: string) {
    if (this.currentUser._id !== user._id){
      this.openDialog(title).subscribe(result => {
        if (result) {
          this.us.delete(user).subscribe((res) => {
            if (res.status !== 400) this.loadAllUsers()
          })
        }
      })
    }
  }

  private loadAllUsers() {
      this.us.getAll().subscribe(users => { this.users = users })
  }

  openDialog(title: string, forRole: string[] = []) {
    return this.ds
      .confirm(title, 'Are you sure you want to do this?', forRole)
  }

  checkUser(user: User){
    let isA = false
    let isSA = false
    if (user.role === this.appConfig.accessTypes.admin) isA = true
    else if (user.role === this.appConfig.accessTypes.super_admin) isSA = true

    return {
      isA: isA,
      isSA: isSA
    }
  }

  manageAdmin(user: User){
    let title: string
    if (this.currentUser._id !== user._id){
      title = user.role === this.appConfig.accessTypes.admin ? 'Remove Admin' : 'Make Admin'
      this.openDialog(title, permissions.admin).subscribe(result => {
        if (result) {
          if (user.role === this.appConfig.accessTypes.admin) user.role = this.appConfig.accessTypes.user
          else if (user.role === this.appConfig.accessTypes.user || user.role === this.appConfig.accessTypes.super_admin) user.role = this.appConfig.accessTypes.admin
          this.us.update(user).subscribe((res) => {
            if (res) {
              this.loadAllUsers()
            }
          })
        }
      })
    }
  }

  manageSuperAdmin(user: User){
    let title: string
    if (this.currentUser._id !== user._id){
      title = user.role === this.appConfig.accessTypes.super_admin ? 'Remove Super Admin' : 'Make Super Admin'
      this.openDialog(title, permissions.super_admin).subscribe(result => {
        if (result) {
          if (user.role === this.appConfig.accessTypes.super_admin) user.role = this.appConfig.accessTypes.user
          else if (user.role === this.appConfig.accessTypes.user || user.role === this.appConfig.accessTypes.admin) user.role = this.appConfig.accessTypes.super_admin
          this.us.update(user).subscribe((res) => {
            if (res) {
              this.loadAllUsers()
            }
          })
        }
      })
    }
  }
}