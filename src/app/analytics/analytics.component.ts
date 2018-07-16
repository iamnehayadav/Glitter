import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { IAnalysis } from '../interface';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  analysis : IAnalysis = null;

  constructor(private data : DataService,private  _router : Router) { }

  ngOnInit() {

    // if (sessionStorage.getItem("sessionId") == null) {
    //   window.alert("Access Denied !!")
    //   this._router.navigate(['/']);
    // }

    this.data.getAnalysis()
    .subscribe((event)=>{
      console.log(event);
      if(event!=null){
        this.analysis = event;
      }
      else{
        alert("Error !Please try again later !!");
      }
    })
    
  }

  //======================LOGOUT=======================
  // logout(){
  //   if(sessionStorage.getItem("sessionId")==null){
  //     window.alert("Already logged out !");
  //   }
  //   else{
  //     sessionStorage.clear();       //frontend logout
  //     this.data.Logout();           //backend logout
  //     this._router.navigate(['/']);
  //     window.alert("Logged Out Successfully !");
  //   }
  // }

}
