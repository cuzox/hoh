import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { FlexLayoutModule } from '@angular/flex-layout'
import {EditorModule} from 'primeng/primeng'

import { UIModule } from './_ui/ui.module'

import { ModalModule } from 'ngx-bootstrap/modal'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { SpinnerModule } from 'angular-spinners'
import { ImageService } from './_services/image.service'

import { Routing } from './app.routing'
import { AlertComponent } from './_directives/alert.component'
import { AuthGuard } from './_guards/auth.guards'
import { AlertService, AuthenticationService, UserService, ChildService, DialogService, ZoneService } from './_services'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AdminComponent } from './admin/admin.component'
import { ChildListComponent } from './child/child-list/child-list.component'
import { ChildCrudComponent } from './child/child-crud/child-crud.component'
import { ChildCardComponent } from './child/child-card/child-card.component'
import { UserListComponent } from './user/user-list.component'
import { ConfirmDialogComponent } from './dialog/confirm-dialog.component'
import { JWTInterceptor } from './_interceptors/http-interceptor'
import { ChildDetailsComponent } from './child/child-details/child-details.component'
import { AboutComponent } from './about/about.component'
import { ContactComponent } from './contact/contact.component'
import { ProjectsComponent } from 'app/projects/projects.component'
import { CartComponent } from './cart/cart.component'
import { BlogComponent } from './blog/blog/blog.component'
import { ArticleComponent } from './blog/article/article.component'
import { CreateComponent } from './blog/create/create.component'


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChildListComponent,
    ChildCrudComponent,
    ChildCardComponent,
    AdminComponent,
    UserListComponent,
    ConfirmDialogComponent,
    ChildDetailsComponent,
    AboutComponent,
    ContactComponent,
    ProjectsComponent,
    CartComponent,
    BlogComponent,
    ArticleComponent,
    CreateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    Routing,
    FlexLayoutModule,
    ReactiveFormsModule,
    UIModule,
    BsDropdownModule.forRoot(),
    SpinnerModule,
    ModalModule.forRoot(),
    EditorModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ChildService,
    DialogService,
    ZoneService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true,
    },
    ImageService
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
