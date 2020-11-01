import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ApiService } from './api.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ses';
  private loggedIn : boolean = false;
  private isAdmin : boolean = false;
  private userSessionData : any;
  //opened = false;

  constructor (
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _apiService: ApiService,
    public datepipe: DatePipe,
    private router:Router
    ) { }

  ngOnInit() {

    if (this.storage.get("uId") || this.storage.get("roleId")) {
      
      this.loggedIn = true;
      this.userSessionData = this._apiService.getSessionUserData();

      // Checking if user is Admin
      if (this.storage.get("roleId")=='0') {
        this.isAdmin = true;
      }

      if (this.storage.get("firstLogin")==1) {
        alert("As it is your first login, you have to change your system generated password into a new one. Please change your password first!");
        this.router.navigate(['ChangePassword']);
      }
    } 
  }

}
