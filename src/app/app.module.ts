import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentRegistrationComponent } from './register/student-registration/student-registration.component';

import { HttpInterceptorProviders } from './services/httpInterceptor/http.interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { ArchitectureComponent } from './architecture/architecture.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { SubjectComponent } from './subject/subject.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { SubjectPageComponent } from './subject-page/subject-page.component';
import { LecturerRegistrationComponent } from './register/lecturer-registration/lecturer-registration.component';
import { StaffRegistrationComponent } from './register/staff-registration/staff-registration.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentRegistrationComponent,
    ArchitectureComponent,
    ProfileComponent,
    DashboardComponent,
    SubjectComponent,
    AssignmentsComponent,
    SubjectPageComponent,
    LecturerRegistrationComponent,
    StaffRegistrationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }