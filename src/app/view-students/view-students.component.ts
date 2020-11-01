import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {

  p : number = 1;
  perPageItems : number = 2;
  searchText ='';

  constructor(
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  allData : any;
  items = [2,3,5,10,15,20,30];

  ngOnInit() {

    if (!this.storage.get('uId')) {
      this.toastr.info('You are not logged in yet!', 'Please Log In!');
      this.router.navigate(['Login']);
    }

    if (this.storage.get('roleId') && this.storage.get('roleId')!=0) {
      this.router.navigate(['Login']);
    }

    this._apiService.getAllStudents().subscribe(
      data => {
        this.allData = data;
        //console.log(this.allData);
      },
      error => {
        this.toastr.error("Error occured while fetching data!", "Error!");
        this.p = 1;
        //console.log(error);
      }
    );
    
  }

  onChangeItemsPerPage(newValue){
    this.perPageItems = newValue;
 }

}
