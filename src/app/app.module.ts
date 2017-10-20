import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout'

// Third party
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { SelectButtonModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';

// Material
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { SpinnerModule } from 'primeng/primeng';

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
    ReactiveFormsModule,
    DropdownModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    SelectButtonModule,
    CalendarModule,
    SpinnerModule,
    InputTextareaModule

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
