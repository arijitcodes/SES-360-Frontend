import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ChangePasswordModel } from './change-password.model';
import { ToastrService } from 'ngx-toastr';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passDontMatch : boolean = false;
  changePassM : ChangePasswordModel = new ChangePasswordModel;

  constructor
  (@Inject(SESSION_STORAGE) private storage: WebStorageService, 
  private _apiService:ApiService, 
  private router:Router,
  private toastr:ToastrService
  ) { }

  ngOnInit() {
    if (!this.storage.get("uId")) {
      alert("You are not logged in yet! Please Log In!");
      this.router.navigate(['Login']);
    }
  }

  fcOldPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  fcNewPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  fcNewPassword2 = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  checkPassMatch() {
    if (this.fcNewPassword.value!=this.fcNewPassword2.value) {
      this.passDontMatch = true;
      //alert("The New Passwords do not match!");
      this.toastr.error("The New Passwords do not match!", "Error!");
    }
    else {
       this.passDontMatch = false;
    }
  }

  submit() {
    //alert("Success!");
    //console.log( "Email Invalid = " + this.emailFormControl.invalid + " & Pass Invalid = " + this.passFormControl.invalid);
    if (this.fcOldPassword.valid && this.fcNewPassword.valid && this.fcNewPassword2.valid) {
      //alert("FF");
      this.checkPassMatch();
      if (this.passDontMatch===false) {
        this.finalSubmit();
      }
    }
  }  

  finalSubmit() {
    
    this.changePassM.uId = this.storage.get("uId");
    this.changePassM.oldPassword = Md5.hashStr(this.fcOldPassword.value);
    this.changePassM.newPassword = Md5.hashStr(this.fcNewPassword.value);
    if (this.storage.get('firstLogin')) {
      this.changePassM.firstLogin = true;
    }
    else {
      this.changePassM.firstLogin = false;
    }

    this._apiService.changePassword(this.changePassM).subscribe(
      data => {
        //alert(data['status']);
        this.toastr.success(data['status']);
        this.router.navigate(['Logout']);
        //console.log(data);
      },
      error => {
        //alert("Error : " + error.error['Error']);
        this.toastr.error(error.error['Error'], "Error!");
        //console.log(error);
      }
    );
  }

}
