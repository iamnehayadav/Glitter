import { Component, OnInit } from '@angular/core';
import { IPerson, IReaction, IProfile, IPlayground } from '../interface';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-psearch',
  templateUrl: './psearch.component.html',
  styleUrls: ['./psearch.component.scss']
})
export class PsearchComponent implements OnInit {

  people: IPerson[] = [];
  personDetail: IProfile;
  listofTweets: IPlayground[] = [];
  personFlag: boolean;
  spm: string;
  constructor(private data: DataService, private _route: Router) { }

  ngOnInit() {
    // if (!this.data.validUser()) {
    //   window.alert("Access Denied !!")
    //   this._route.navigate(['/']);
    // }
  }

  getAllUsers(searchParam: string) {
    this.people = []
    const str: string = searchParam;
    this.spm = searchParam;
    this.data.getUserBySearch(str)
      .subscribe((event) => {
        if (event != null) {
          event.forEach(element => {
            var temp: IPerson;
            temp = element;
            console.log(temp);
            this.people.push(temp);
          });
        }
        else {
          alert("Error !! Try again later !!");
        }
      })
  }

  update(arr) {
    this.listofTweets = arr;
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
          alert("Person added to followings successfully !!");
          this.people = [];
          this.data.getUserBySearch(this.spm)
            .subscribe((event) => {
              if (event != null) {
                event.forEach(element => {
                  var temp: IPerson;
                  temp = element;
                  console.log(temp);
                  this.people.push(temp);
                });
              }
              else {
                alert("Error !! Try again later !!");
              }
            })
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
          this._route.navigate(['/followings']);
        }
      })
  }
}
