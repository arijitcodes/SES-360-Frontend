import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})

export class ViewProfileComponent implements OnInit {

  keys = Array();
  values = Array();
  arr : any;
  stream : string;
  subjects:any;
  s:string = "";

  rolesData : any;

  constructor(
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private router: Router,
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    if (!this.storage.get("uId")) {
      alert("You are not logged in yet! Please Log In!");
      this.router.navigate(['Login']);
    }

    if (this.storage.get("firstLogin")==1) {
      alert("As it is your first login, you have to change your system generated password into a new one. Please change your password first!");
      this.router.navigate(['ChangePassword']);
    }

    this._apiService.getUserById(this.storage.get("uId")).subscribe(
      data => {
        //alert("SUCCESS");
        //console.log(data);
        this.keys = Object.keys(data);
        this.values = Object.values(data);
        this.arr = data;
        /* switch (this.arr['streamId']) {
          case '1':
            this.stream = "SCIENCE";
            break;
          case '2':
            this.stream = "ARTS";
            break;
          case '3':
            this.stream = "IT";
            break;
          case '4':
            this.stream = "CSE";
            break;
          
          default:
            break;
        } */
      },
      error => {
        alert("Error " + error.status + " : Data " + error.statusText);
        //console.log(error);
      }
    );

    this._apiService.getStream(this.storage.get("uId")).subscribe(
      data => {
        this.stream = data['name'];
      },
      error => {
        this.stream = "<Error Occured! Could not get stream name!>";
        console.log(error);
      }
    );

    this._apiService.getSubjectsByUId(this.storage.get("uId")).subscribe(
      data => {
        this.subjects = data;
        for (let i = 0; i < this.subjects.length; i++) {
          this.s += this.subjects[i]['subject'];
          if (i!=this.subjects.length-1) {
            this.s += ", ";
          }
        }
        //console.log(this.s);
      },
      error => {
        this.s = "<Error Occured! Could not get subjects!>";
        console.log(error);
      }
    );

    this._apiService.getRoleByUId(this.storage.get("uId")).subscribe(
      data => {
        if (data['roleId']===this.storage.get("roleId")) {
          this.rolesData = data;
        }
        else {
          this.rolesData = {
            "roleName":"N/A"
          };
        }
      },
      error => {
         console.log(error);
      }
    );
  }

  

}
