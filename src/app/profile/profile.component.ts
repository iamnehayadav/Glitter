import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { ProfileinfoComponent } from '../profileinfo/profileinfo.component';

import { TweetComponent } from '../tweet/tweet.component';
import { IProfile ,IPerson,IPlayground} from '../interface';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  currentUser : IProfile;
  userProfile : IPerson;
  userTweets : IPlayground[] = [];
  constructor(private data : DataService , private _route : Router) { }

  ngOnInit() {

    // if (!this.data.validUser()) {
    //   window.alert("Access Denied !!")
    //   this._route.navigate(['/']);
    // }

    this.currentUser = null;
    const id = this.data.userId();
    this.data.getUserById(id)
    .subscribe((event)=>{
      console.log(event);
      if(event!=null){
        this.currentUser = event;
      }
      else{
        alert("Error ! Try again later !!");
      }
    })
  }

  update(arr){
    this.ngOnInit();
  }
}
