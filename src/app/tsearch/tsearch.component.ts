import { Component, OnInit } from '@angular/core';

import { TweetComponent } from '../tweet/tweet.component';
import { DataService } from '../data.service';
import { IPlayground } from '../interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tsearch',
  templateUrl: './tsearch.component.html',
  styleUrls: ['./tsearch.component.scss']
})
export class TsearchComponent implements OnInit {
tweets : IPlayground[] = [];
  constructor(private data : DataService,private _route : Router) { }

  ngOnInit() {
    // if (!this.data.validUser()) {
    //   window.alert("Access Denied !!")
    //   this._route.navigate(['/']);
    // }
  }

  getTweets(searchParam : string){
    this.tweets = [];
    const str : string = searchParam;
    this.data.getTweetBySearch(str)
    .subscribe((event)=>{
      event.forEach(element => {
        console.log(element);
        this.tweets.push(element);
      });
    })
  }

  checkUser(uid: number): boolean {
    if (this.data.userId() == uid) {
      return true;
    }
    else {
      return false;
    }
  }

  // editTweet(tid : number){

  // }

  // deleteTweet(tid : number){

  // }

}
