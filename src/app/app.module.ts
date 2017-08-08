import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

//Third party
import { FlexLayoutModule } from "@angular/flex-layout";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
// import { AlertModule } from 'ngx-bootstrap';
import { ImageUploadModule } from "angular2-image-upload";

// Custom
import { routing } from './app.routing';
import { customHttpProvider } from './_helpers/custom-http';
import { AlertComponent } from './_directives/alert.component';
import { AuthGuard } from './_guards/auth.guards';
import { AlertService, AuthenticationService, UserService, ChildService, DialogService} from './_services/index';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ChildListComponent } from './child/child-list.component';
import { ChildComponent } from './child/child.component';
import { ChildDetailComponent } from './child/child-detail.component';
import { UserListComponent } from './user/user-list.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChildListComponent,
    ChildComponent,
    ChildDetailComponent,
    AdminComponent,
    UserListComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    // AlertModule.forRoot(),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot()
    
  ],
  providers: [
    customHttpProvider,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ChildService,
    DialogService
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
