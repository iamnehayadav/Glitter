import { NgModule } from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlaygroundComponent } from './playground/playground.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingsComponent } from './followings/followings.component';
import { ProfileComponent } from './profile/profile.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TsearchComponent } from './tsearch/tsearch.component';
import { PsearchComponent } from './psearch/psearch.component';
import { TweetComponent } from './tweet/tweet.component';
import { ProfileinfoComponent } from './profileinfo/profileinfo.component';
import { NavigationbarComponent } from './Shared/navigationbar/navigationbar.component';
import { Injectable } from '@angular/core';
import { AlwaysAuthGuard } from './data.service';

const ROUTES: Routes = [
        { path: 'register', component: RegisterComponent },
        { path: 'playground', component: PlaygroundComponent, canActivate: [AlwaysAuthGuard] },
        { path: 'followers', component: FollowersComponent, canActivate: [AlwaysAuthGuard] },
        { path: 'followings', component: FollowingsComponent, canActivate: [AlwaysAuthGuard] },
        { path: 'profile', component: ProfileComponent, canActivate: [AlwaysAuthGuard] },
        { path: 'analytics', component: AnalyticsComponent, canActivate: [AlwaysAuthGuard] },
        { path: 'tweetsearch', component: TsearchComponent, canActivate: [AlwaysAuthGuard] },
        { path: 'peoplesearch', component: PsearchComponent, canActivate: [AlwaysAuthGuard] },
        {path: 'navbar',component: NavigationbarComponent, canActivate: [AlwaysAuthGuard]},
        {path: '', component: LoginComponent}
    ];


    @NgModule({
        imports: [RouterModule.forRoot(ROUTES)],
        exports: [RouterModule],
        providers:[AlwaysAuthGuard]
      })
      export class AppRoutingModule { }
      
      export const routingComponents = [LoginComponent,RegisterComponent,PlaygroundComponent,FollowersComponent,
        FollowingsComponent,ProfileComponent,AnalyticsComponent,TsearchComponent,PsearchComponent,TweetComponent,
        ProfileinfoComponent]; 