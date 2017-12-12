import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AboutComponent } from './about/about.component'
import { ContactComponent } from './contact/contact.component'
import { ProjectsComponent } from './projects/projects.component'
import { AdminComponent } from './admin/admin.component'
import { ChildListComponent } from './child/child-list/child-list.component'
import { ChildCrudComponent } from './child/child-crud/child-crud.component'
import { ChildDetailsComponent } from './child/child-details/child-details.component'
import { UserListComponent } from './user/user-list.component'
import { AuthGuard } from './_guards/auth.guards'
import { appConfig } from './app.config'
import { CartComponent } from 'app/cart/cart.component'
import { BlogComponent } from './blog/blog/blog.component'
import { ArticleComponent } from './blog/article/article.component'
import { CreateComponent } from './blog/create/create.component'
import { BlogListComponent} from './blog/blog-list/blog-list.component'


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
                path: 'children',
                component: ChildListComponent
            },
            {
                path: 'create-child',
                component: ChildCrudComponent
            },
            {
                path: 'users',
                component: UserListComponent
            }
        ]
    },
    {
        path: 'children',
        component: ChildListComponent
    }, 
    {
        path: 'children/:id',
        component: ChildDetailsComponent

    },
    {
        path: 'create-child',
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
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'blog/article/:id',
        component: ArticleComponent

    },
    {
        path: 'blog/create/:id',
        component: CreateComponent
    }, {
        path: 'blog-list',
        component: BlogListComponent

    },
    // Otherwise redirect to home
    {
        path: '**',
        redirectTo: ''
    }
]

export const Routing = RouterModule.forRoot(appRoutes)