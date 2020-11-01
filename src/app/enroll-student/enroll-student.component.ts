import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
//import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { enrollStudentModel } from './enroll-student.model';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css'],
  providers: [
    /* {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    } */
  ]
})
export class EnrollStudentComponent implements OnInit {

  enrollStudentM : enrollStudentModel = new enrollStudentModel;
  streams : any;

  constructor(
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _apiService : ApiService,
    private router: Router,
    public datepipe: DatePipe,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    if (!this.storage.get("uId")) {
      this.storage.remove("uId");
      alert("You are not logged in yet! Please Log In!");
      this.router.navigate(['Login']);
    }
    
    if (this.storage.get('roleId') && this.storage.get('roleId')!=0) {
      this.router.navigate(['Login']);
    }

    this._apiService.getAllStreams().subscribe(
      data => {
        this.streams = data;
        //console.log(this.streams);
      },
      error => {
        alert("Error: " + error.error + " Couldn't get All Streams! Contact Administrator!")
        //console.log(error);
      }
    );
  }

  maxDate = new Date();
  errorBody : string;
  dob : any;
  
  fcFName = new FormControl('', [Validators.required]);
  fcLName = new FormControl('', [Validators.required]);
  fcStream = new FormControl('', [Validators.required]);
  fcDob   = new FormControl('', [Validators.required]);
  fcCaste = new FormControl('', [Validators.required]);
  fcEmail = new FormControl('', [Validators.required, Validators.email]);
  fcMobile = new FormControl('', [Validators.required]);
  fcFathersName = new FormControl('', [Validators.required]);
  fcMothersName = new FormControl('', [Validators.required]);
  fcAddress = new FormControl('', [Validators.required]);
  fcCity = new FormControl('', [Validators.required]);
  fcDistrict = new FormControl('', [Validators.required]);
  fcState = new FormControl('', [Validators.required]);
  fcPin = new FormControl('', [Validators.required]);
  fcCountry = new FormControl('', [Validators.required]);

  submit() {
    if (
      this.fcLName.valid &&
      this.fcFName.valid &&
      this.fcStream.valid &&
      this.fcDob.valid &&
      this.fcCaste.valid &&
      this.fcEmail.valid &&
      this.fcMobile.valid &&
      this.fcFathersName.valid &&
      this.fcMothersName.valid &&
      this.fcAddress.valid &&
      this.fcCity.valid &&
      this.fcDistrict.valid &&
      this.fcState.valid &&
      this.fcPin.valid &&
      this.fcCountry.valid 
    ) {

        this.finalSubmit();
    }
  }
 
  
  finalSubmit() {

    this.dob = this.datepipe.transform(this.fcDob.value, 'yyyy-MM-dd');

    this.enrollStudentM.streamId = this.fcStream.value;
    this.enrollStudentM.fName = this.fcFName.value;
    this.enrollStudentM.lName = this.fcLName.value;
    this.enrollStudentM.email = this.fcEmail.value;
    this.enrollStudentM.phone = this.fcMobile.value;
    this.enrollStudentM.dob = this.dob;
    this.enrollStudentM.caste = this.fcCaste.value;
    this.enrollStudentM.fathersName = this.fcFathersName.value;
    this.enrollStudentM.mothersName = this.fcMothersName.value;
    this.enrollStudentM.roleId = '1';
    this.enrollStudentM.address = this.fcAddress.value;
    this.enrollStudentM.city = this.fcCity.value;
    this.enrollStudentM.district = this.fcDistrict.value;
    this.enrollStudentM.pin = this.fcPin.value;
    this.enrollStudentM.state = this.fcState.value;
    this.enrollStudentM.country = this.fcCountry.value;

    //alert("Stream Id : " + this.enrollStudentM.streamId + " AND Caste : " + this.enrollStudentM.caste);

    this._apiService.enrollStudent(this.enrollStudentM).subscribe(
      data => {
        //alert(data['Status']);
        this.toastr.success(data['Status'], "Success!");
        window.location.href="EnrollStudent";
        //console.log(data);
      },
      error => {
        /* var newLine = '\r\n';
        this.errorBody = "Error : " + error['status'];
        this.errorBody += newLine;
        this.errorBody += "Status : " + error.error['Status'];
        this.errorBody += newLine;
        this.errorBody += "Reason : " + error.error['Error'];
        alert(this.errorBody); */
        
        this.toastr.error("Error " + error['status'] + " - " + error.error['Status'], error.error['Error']);
        //console.log(error);
      }
    );
 }
}
