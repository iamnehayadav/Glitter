import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Form, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import{ HttpClient,HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { AppRoutingModule, routingComponents } from './app.routing';

import { AppComponent } from './app.component';
import { NavigationbarComponent } from './Shared/navigationbar/navigationbar.component';
import { TweetsComponent } from './Shared/tweets/tweets.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { PlaygroundComponent } from './playground/playground.component';
// import { FollowersComponent } from './followers/followers.component';
// import { FollowingsComponent } from './followings/followings.component';
// import { ProfileComponent } from './profile/profile.component';
// import { AnalyticsComponent } from './analytics/analytics.component';
// import { TsearchComponent } from './tsearch/tsearch.component';
// import { PsearchComponent } from './psearch/psearch.component';
// import { TweetComponent } from './tweet/tweet.component';
// import { ProfileinfoComponent } from './profileinfo/profileinfo.component';
//import {  } from 'selenium-webdriver/http';

// const ROUTES : Routes = [
//   {path : 'register', component : RegisterComponent},
//   {path : 'playground', component : PlaygroundComponent},
//   {path : 'followers', component : FollowersComponent},
//   {path : 'followings', component : FollowingsComponent},
//   {path : 'profile', component : ProfileComponent},
//   {path : 'analytics', component : AnalyticsComponent},
//   {path : 'tweetsearch', component : TsearchComponent},
//   {path : 'peoplesearch', component : PsearchComponent},
//   {path : '', component : LoginComponent},
// ]


@NgModule({
  declarations: [
    AppComponent,routingComponents, NavigationbarComponent, TweetsComponent
    // LoginComponent,
    // RegisterComponent,
    // PlaygroundComponent,
    // FollowersComponent,
    // FollowingsComponent,
    // ProfileComponent,
    // AnalyticsComponent,
    // TsearchComponent,
    // PsearchComponent,
    // TweetComponent,
    // ProfileinfoComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DataService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
