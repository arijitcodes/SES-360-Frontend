import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  body : string;
  userData : string;

  private urlApiMain : string = "http://127.0.0.1/sesapi/api/";
  private urlLoginAuth : string = this.urlApiMain + "auth";
  private urlEnrollUser : string = this.urlApiMain + "enrollStudent";
  private urlUserProfile : string = this.urlApiMain + "userProfile";
  private urlRoleByUId : string = this.urlApiMain + "getRoleByUId";
  private urlChangePassword : string = this.urlApiMain + "changePassword";
  private urlGetStream : string = this.urlApiMain + "getStream";
  private urlGetSubjectsByUId : string = this.urlApiMain + "getSubjectsByUId";
  private urlgetAllStreams : string = this.urlApiMain + "getAllStreams";
  private urlGetAllStudents : string = this.urlApiMain + "getAllStudents";

  constructor(
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private http:HttpClient,
    private datepipe: DatePipe
  ) { }

    

  getSessionUserData() {
    this.userData = this.storage.get("userData");
    let x = this.userData.split("|");
    if (x[1]=='0' && x[2]=='0') {
      x[1] = "N/A";
      x[2] = "N/A";
    }
    else {
      x[2] = this.datepipe.transform(x[2], 'dd/MM/yyyy - hh:mm:ss a');
    }
      //console.log(x);
    return x;
  }

  loginAuth(loginDetails:any): Observable<any> {
    //let bb = '[{"email":"banerjee.arijit58@gmail.com","password":"4261900"}]';
    //console.log(loginDetails);
    this.body = JSON.stringify(loginDetails);
    //console.log(this.body);
    return this.http.post<any>(this.urlLoginAuth, this.body);
  }

  enrollStudent(student:any): Observable<any> {
    this.body = JSON.stringify(student);
    return this.http.post<any>(this.urlEnrollUser, this.body);
  }

  getUserById(uId:number): Observable<any> {
    this.body = JSON.stringify(uId);
    //console.log(this.body);
    return this.http.post<any>(this.urlUserProfile, this.body);
  }

  getRoleByUId(uId:number): Observable<any> {
    this.body = JSON.stringify(uId);
    return this.http.post<any>(this.urlRoleByUId, this.body);
  }

  changePassword(changePassData:any): Observable<any> {
    this.body = JSON.stringify(changePassData);
    return this.http.post<any>(this.urlChangePassword, this.body);
  }

  getStream(uId:number): Observable<any> {
    this.body = JSON.stringify(uId);
    return this.http.post<any>(this.urlGetStream, this.body);
  }

  getSubjectsByUId(uId:number): Observable<any> {
    this.body = JSON.stringify(uId);
    return this.http.post<any>(this.urlGetSubjectsByUId, this.body);
  }

  getAllStreams(): Observable<any> {
    return this.http.get<any>(this.urlgetAllStreams);
  }

  getAllStudents(): Observable<any> {
    return this.http.get<any>(this.urlGetAllStudents);
  }
  
}
