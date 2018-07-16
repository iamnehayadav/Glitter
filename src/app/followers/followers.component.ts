import { Component, OnInit } from '@angular/core';
import { IPerson, IReaction, IProfile } from '../interface';
import { DataService } from '../data.service';
import { IPlayground, ITweetPost } from '../interface';
import { TweetComponent } from '../tweet/tweet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  listOfFollowers: IPerson[] = [];
  personDetail?: IProfile;
  listofTweets: IPlayground[] = [];
  personFlag: boolean = false;
  constructor(private data: DataService, private _route: Router) { }

  ngOnInit() {
    // if (!this.data.validUser()) {
    //   window.alert("Access Denied !!")
    //   this._route.navigate(['/']);
    // }
      const id = this.data.userId();
      const flag = true;
      this.data.getConnections(id, flag)
        .subscribe((event) => {
          event.forEach(element => {
            console.log(element);
            this.listOfFollowers.push(element);
          });
      })
  }

  update(arr) {
    this.listofTweets = arr;
  }

  //===========================get details of a particular user========================== 
  getPerson(pid: number) {
    const id: number = pid;
    console.log(id);
    this.data.getUserById(id)
      .subscribe((event) => {
        console.log(event);
        if (event != null) {
          this.personDetail = event;
          console.log(this.personDetail);

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

  //===============================helper function==========================================
  checkFollowing(f: boolean): boolean {
    return !(f);
  }

  //===================follow a user with user id pid======================================
  follow(pid: number) {
    const value: IReaction = {
      id: pid,
      reactionFlag: true
    }
    this.data.postConnectionData(value)
      .subscribe((event) => {
        console.log(event);
        if (event == true) {
          alert("Person added to your followings !!");
          const id = this.data.userId();
          const flag = true;
          this.data.getConnections(id, flag)
            .subscribe((event) => {
              this.listOfFollowers = [];
              event.forEach(element => {
                var temp: IPerson
                temp = element
                console.log(temp);
                this.listOfFollowers.push(temp);
              });

            })
        }
        else {
          alert("Error adding following !!");
        }
      })
  }


  //====================unfollow a person with user id pid===================================
  unfollow(pid: number) {
    const value: IReaction = {
      id: pid,
      reactionFlag: false
    }
    this.data.postConnectionData(value)
      .subscribe((event) => {
        console.log(event);
        if (event == true) {
          alert("Removed from followings");
          const id = this.data.userId();
          const flag = true;
          this.data.getConnections(id, flag)
            .subscribe((event) => {
              this.listOfFollowers = [];
              event.forEach(element => {
                var temp: IPerson
                temp = element
                console.log(temp);
                this.listOfFollowers.push(temp);
              });

            })
        }
        else {
          alert("Error removing following !!");
        }
      })
  }

}
