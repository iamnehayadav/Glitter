import { Component, OnInit } from '@angular/core';

import { IPerson, IReaction, IProfile, IPlayground } from '../interface';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followings',
  templateUrl: './followings.component.html',
  styleUrls: ['./followings.component.scss']
})
export class FollowingsComponent implements OnInit {

  listOfFollowings: IPerson[] = [];
  personDetail: IProfile;
  listofTweets: IPlayground[] = [];
  personFlag: boolean = false;
  constructor(private data: DataService, private _route: Router) { }

  ngOnInit() {

    // if (!this.data.validUser()) {
    //   window.alert("Access Denied !!")
    //   this._route.navigate(['/']);
    // }

    this.listOfFollowings = [];
    const uid = this.data.userId();
    const flag = false
    this.data.getConnections(uid, flag)
      .subscribe((event) => {
        event.forEach(element => {
          var temp: IPerson
          temp = element
          console.log("user  " + temp);
          this.listOfFollowings.push(temp);
        });

      })
  }
  update(arr) {
    this.ngOnInit();
  }

  getPerson(pid: number) {
    const id: number = pid;
    this.data.getUserById(id)
      .subscribe((event) => {
        console.log(event);
        if (event != null) {
          this.personDetail = event;
          this.listofTweets = [];
          event.Tweets.forEach(element => {
            this.listofTweets.push(element);
          });
          this.personFlag = event.followFlag;
        }
        else {
          alert("Error !! please try again later !!");
        }
      })
  }

  checkFollowing(f: boolean): boolean {
    return !(f);
  }

  follow(pid: number) {
    const value: IReaction = {
      id: pid,
      reactionFlag: true
    }
    this.data.postConnectionData(value)
      .subscribe((event) => {
        console.log(event);
        if (event == true) {
          alert("Person added to followings !!");
          const id = this.data.userId();
          const flag = false;
          this.data.getConnections(id, flag)
            .subscribe((event) => {
              this.listOfFollowings = [];
              event.forEach(element => {
                var temp: IPerson
                temp = element
                console.log(temp);
                this.listOfFollowings.push(temp);
              });

            })
        }
        else{
          alert("Error adding following !!");
        }
      })
  }

  unfollow(pid: number) {
    const value: IReaction = {
      id: pid,
      reactionFlag: false
    }
    this.data.postConnectionData(value)
      .subscribe((event) => {
        console.log(event);
        if (event == true) {
          alert("Person removed from followings !!");
          const id = this.data.userId();
          const flag = false;
          this.data.getConnections(id, flag)
            .subscribe((event) => {
              this.listOfFollowings = [];
              event.forEach(element => {
                var temp: IPerson
                temp = element
                console.log(temp);
                this.listOfFollowings.push(temp);
              });

            })
        }
        else{
          alert("Error removing following !!");
        }
      })
  }

}
