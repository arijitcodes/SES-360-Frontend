import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EnrollStudentComponent } from './enroll-student/enroll-student.component';
import { LogoutComponent } from './logout/logout.component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ViewStudentsComponent } from './view-students/view-students.component';

const routes: Routes = [
  { path:'', redirectTo: '/Login', pathMatch: 'full' },
  { path:'Login', component: LoginComponent },
  { path:'Logout', component: LogoutComponent },
  { path:'EnrollStudent', component: EnrollStudentComponent },
  { path: 'ViewStudents', component: ViewStudentsComponent },
  { path:'ViewProfile', component: ViewProfileComponent },
  { path:'ChangePassword', component: ChangePasswordComponent },
  { path:'**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
