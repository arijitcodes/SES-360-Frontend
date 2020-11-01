import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { EnrollStudentComponent } from './enroll-student/enroll-student.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { StorageServiceModule} from 'angular-webstorage-service';
import { DatePipe } from '@angular/common';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ToastrModule } from 'ngx-toastr';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    EnrollStudentComponent,
    NotFoundComponent,
    ViewProfileComponent,
    ChangePasswordComponent,
    ViewStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    StorageServiceModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    })
  ],
  providers: [ApiService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
