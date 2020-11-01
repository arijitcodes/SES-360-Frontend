import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  

  constructor(
    @Inject(SESSION_STORAGE) private storage: WebStorageService, 
    private router:Router,
    private toastr:ToastrService
    ) { }

  ngOnInit() {

    if (this.storage.get("uId") || this.storage.get("roleId")) {
      this.storage.remove("uId");
      this.storage.remove("roleId");
      this.storage.remove("userData");
      if (this.storage.get('firstLogin')) {
        //alert("First Login Done! Removing Session!");
        this.storage.remove('firstLogin');
      }
      //alert("Logged Out Successfully");
      this.toastr.success("Logged Out Successfully!");
      window.location.href="Login";
      //this.router.navigate(['/Login']);
    } 
    
    else {
      //alert("Not logged in!");
      this.router.navigate(["Login"]);
    }
  }

}
