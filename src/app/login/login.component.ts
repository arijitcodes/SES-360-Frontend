import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ApiService } from '../api.service';
import { loginModel } from './login.model';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFailed : boolean = false;
  loginM : loginModel = new loginModel;
  
  constructor(
    @Inject(SESSION_STORAGE) private storage: WebStorageService, 
    private _apiService:ApiService, 
    private router:Router,
    private toastr:ToastrService,
    ) { }

  ngOnInit() {
    //alert("User Id: " + this.storage.get("uId") + " and Role Id: " + this.storage.get("roleId"));
    if (this.storage.get("uId")) {
      //alert("Already logged in!");
      if (this.storage.get("roleId")==='0') {
        this.router.navigate(["EnrollStudent"]);
      }
      else {
        this.router.navigate(["ViewProfile"]);
      }
    }
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);


  submit() {
    //alert("Success!");
    //console.log( "Email Invalid = " + this.emailFormControl.invalid + " & Pass Invalid = " + this.passFormControl.invalid);
    if (this.emailFormControl.valid && this.passFormControl.valid) {
      //alert("FF");
      this.finalSubmit();
    }
  }  

  finalSubmit() {
    //var loginDetails = new Array();
    //loginDetails["email"]=this.emailFormControl.value;
    //loginDetails["password"]=this.passFormControl.value;
    this.loginM.email=this.emailFormControl.value;
    this.loginM.password=Md5.hashStr(this.passFormControl.value);
    //console.log(this.loginM);
    this._apiService.loginAuth(this.loginM).subscribe(
      data => {
        //console.log("Req Placed. Data - ", data);
        //this.storage.set("userId", "true");
        let hdata = data['fName'] + "|" + data['lastIp'] + "|" + data['lastLoginDate'];
        this.storage.set("uId", data['uId']);
        this.storage.set("roleId", data['roleId']);
        this.storage.set("userData", hdata);
        if (data['firstLogin']==1) {
          this.storage.set("firstLogin", '1');
        }
        //alert("Login Success! User Id: " + this.storage.get("uId") + " and Role Id: " + this.storage.get("roleId"));
        if (this.storage.get("roleId")==='0') {
          window.location.href="EnrollStudent";
          //this.router.navigate(['EnrollStudent']);
        } else if (this.storage.get("roleId")==='1') {
          window.location.href="ViewProfile";
          //this.router.navigate(['Profile']);
        }
      },
      error => {
        console.log("Error Occured - ", error);
        //alert("Login Failed! " + error.error['Status']);
        this.toastr.error(error.error['Status'], "Login Failed!");
      }
    );
    //alert("Submit Success! Email = " + loginDetails['email'] + " & Pass = " + loginDetails['password']);
  }

}
