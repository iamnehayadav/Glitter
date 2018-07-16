import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IReaction, ITweetDelete, ITweetEdit, IPerson, IPlayground, ITweetPost } from '../interface';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() tweets;
  @Output() result = new EventEmitter<string>();
  listOfPerson: IPerson[] = [];
  getPerson: boolean;
  tweet: IPlayground;
  prevMessage: string;
  tempTid: number;
  requiredTweet: string;
  clicked: boolean = false;
  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  //===================================================================================================

  like(id: number) {
    const likeTweet: IReaction = {
      id: id,
      reactionFlag: true
    }
    this.data.postReactionData(likeTweet)
      .subscribe((event: boolean) => {
        console.log(event);
        if (event == true) {
          this.data.getPlayground(this.data.userId())
            .subscribe((event) => {
              this.tweets = [];
              event.forEach(element => {
                this.tweets.push(element);
              });
              this.result.emit(this.tweets);
            })
        }
        else {
          window.alert("There was some error !");
        }
      });
  }
  //======================================================================================
  dislike(id: number) {
    const dislikeTweet: IReaction = {
      id: id,
      reactionFlag: false
    }

    this.data.postReactionData(dislikeTweet)
      .subscribe((event: boolean) => {
        console.log(event);
        if (event == true) {
          this.data.getPlayground(this.data.userId())
            .subscribe((event) => {
              this.tweets = [];
              event.forEach(element => {
                this.tweets.push(element);
              });
              this.result.emit(this.tweets);
            })
        }
        else {
          window.alert("There was some error !");
        }
      });
  }
  //=========================================================================================
  checkUser(uid: number): boolean {
    if (this.data.userId() == uid) {
      return true;
    }
    else {
      return false;
    }
  }
  //=========================================================================================
  editTweet(tid: number) {
    const id: number = tid;
    this.tempTid = id;
    this.data.getTweetById(id)
      .subscribe((event) => {
        console.log(event);
        if (event != null) {
          this.prevMessage = event;
        }

      })
  }

  submitTweet(message: string) {
    const tweeet: ITweetEdit = {
      tid: this.tempTid,
      tweet: message
    }
    this.data.editTweetData(tweeet)
      .subscribe((event) => {
        console.log(event);
        if (event == true) {
          alert("Tweet edited successfully !!");
          this.data.getPlayground(this.data.userId())
            .subscribe((event) => {
              this.tweets = [];
              event.forEach(element => {
                this.tweets.push(element);
              });
              this.result.emit(this.tweets);
            })
        }
        else {
          window.alert("Error editing tweet !!");
        }
      })
  }
  //===========================================================================================
  deleteTweet(tid: number) {
    const deleteId: number = tid;
    this.data.deleteTweetData(deleteId)
      .subscribe((event) => {
        console.log(event);
        if (event == true) {
          alert("Tweet deleted successfully !!");
          this.data.getPlayground(this.data.userId())
            .subscribe((event) => {
              this.tweets = [];
              event.forEach(element => {
                this.tweets.push(element);
              });
              this.result.emit(this.tweets);
            })
        }
        else {
          alert("Error deleting tweet !!");
        }
      })
  }
  //==========================================================================================
  getLikes(tid: number) {
    const flag = true;
    this.data.getReaction(tid, flag)
      .subscribe((event) => {
        console.log(event);
        if (event != null) {
          event.forEach(element => {
            var temp: IPerson
            temp = element
            console.log(temp);
            this.listOfPerson.push(temp);
          });
          this.ngOnInit();
        }
        else {
          window.alert("There was some error !");
        }
      });
  }
  //===========================================================================================
  getDislike(tid: number) {
    const flag = false;

    this.data.getReaction(tid, flag)
      .subscribe((event) => {
        console.log(event);
        if (event != null) {
          event.forEach(element => {
            var temp: IPerson
            temp = element
            console.log(temp);
            this.listOfPerson.push(temp);
          });
          this.ngOnInit();
        }
        else {
          window.alert("There was some error !");
        }
      });
  }

  //============================================================================================
  checkFlag(flag: boolean) {
    return (!flag);
  }

  viewTweet(tid: number) {
    const id: number = tid;
    this.tempTid = id;
    this.data.getTweetById(id)
      .subscribe((event) => {
        this.requiredTweet=null;
        if (event != null) {
          this.requiredTweet = event;
        }

      })
  }


  postTweet(message: string) {
    const value: ITweetPost = {
      input: message
    }
    this.data.postTweetData(value)
      .subscribe((event: boolean) => {
        console.log(event);
        if (event == true) {
          alert("Tweet Added Successfully !");
          this.data.getPlayground(this.data.userId())
            .subscribe((event) => {
              this.tweets = [];
              event.forEach(element => {
                this.tweets.push(element);
              });
              this.result.emit(this.tweets);
            })
        }
        else {
          alert("Could not add tweet! Please try again later !!");
        }
      })
  }

  getLikePerson(id: number, flag: boolean) {
    this.viewTweet(id);
    this.listOfPerson = [];
    this.data.getReaction(id,true)
    .subscribe((event)=>{
      event.forEach(element=>{
        console.log(element.fName)
        this.listOfPerson.push(element);
      })
    })
    this.data.getReaction(id,false)
    .subscribe((event)=>{
      event.forEach(element=>{
        this.listOfPerson.push(element);
      })
    })
    this.clicked=true;
  }

  back(){
    this.clicked=false;
  }
}
