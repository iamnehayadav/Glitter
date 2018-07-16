import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IPlayground, ITweetPost } from '../interface';
import { TweetComponent } from '../tweet/tweet.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  private id: number;
  constructor(private data: DataService, private _router: Router) {
    this.id = this.data.userId();
    console.log(this.id);
  }

  listOfTweets: IPlayground[] = [];

  ngOnInit() {
    // if (!this.data.validUser()) {
    //   window.alert("Access Denied !!")
    //   this._router.navigate(['/']);
    // }

    console.log(this.id);
    this.listOfTweets = [];
    this.data.getPlayground(this.id)
      .subscribe((event: any) => {
        console.log(event);
        event.forEach(element => {
          var temp: IPlayground
          temp = element
          console.log(temp);
          this.listOfTweets.push(temp);
        });
      })
  }

  // postTweet(message: string) {
  //   const value: ITweetPost = {
  //     input: message
  //   }
  //   this.data.postTweetData(value)
  //     .subscribe((event: boolean) => {
  //       console.log(event);
  //       if (event == true) {
  //         alert("Tweet Added Successfully !");
  //         this.data.getPlayground(this.data.userId())
  //           .subscribe((event) => {
  //             this.listOfTweets = [];
  //             event.forEach(element => {
  //               this.listOfTweets.push(element);
  //             });
  //           })
  //       }
  //       else {
  //         alert("Could not add tweet! Please try again later !!");
  //       }
  //     })
  // }

  update(arr) {
    this.listOfTweets = arr;
  }

}
