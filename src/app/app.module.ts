import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Third party
import { FlexLayoutModule } from '@angular/flex-layout'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '@angular/material'
import { ImageUploadModule } from 'angular2-image-upload'
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';

// Custom
import { routing } from './app.routing'
import { AlertComponent } from './_directives/alert.component'
import { AuthGuard } from './_guards/auth.guards'
import { AlertService, AuthenticationService, UserService, ChildService, DialogService, ZoneService } from './_services/index'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AdminComponent } from './admin/admin.component'
import { ChildListComponent } from './child/child-list/child-list.component'
import { ChildCrudComponent } from './child/child-crud/child-crud.component'
import { ChildCardComponent } from './child/child-card/child-card.component'
import { UserListComponent } from './user/user-list.component'
import { ConfirmDialogComponent } from './dialog/confirm-dialog.component';
import { JWTInterceptor } from './_interceptors/http-interceptor';

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
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot(),
    DropdownModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule
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
    }
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
