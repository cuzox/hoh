import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AdminComponent } from './admin/admin.component'
import { ChildListComponent } from './child/child-list/child-list.component'
import { ChildCrudComponent } from './child/child-crud/child-crud.component'
import { UserListComponent } from './user/user-list.component'
import { AuthGuard } from './_guards/auth.guards'
import { appConfig } from './app.config'

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: {
            role: appConfig.accessLevels.admin
        },
        children: [
            {
                path: '',
                redirectTo: 'children',
                pathMatch: 'full'
            },
            {
                path: 'users',
                component: UserListComponent
            },
            {
                path: 'children',
                component: ChildListComponent
            }
        ]
    },
    {
        path: 'children',
        component: ChildListComponent
    },
    {
        path: 'test',
        component: ChildCrudComponent
    },
    {
        path: 'children/:id',
        component: ChildCrudComponent

    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },

    // otherwise redirect to home
    {
        path: '**',
        redirectTo: ''
    }
]

export const routing = RouterModule.forRoot(appRoutes)