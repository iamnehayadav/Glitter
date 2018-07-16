import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ILogin, IRegister, IReaction, ITweetDelete, ITweetEdit, ITweetPost, IPlayground, IAnalysis, IPerson, IProfile } from './interface';
import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestMethod } from '@angular/http';
import {CanActivate, Router} from "@angular/router"; 
import { Route } from '@angular/compiler/src/core';


@Injectable()
export class DataService {
  BASE_URL = 'http://localhost:52496/api/';
  constructor(private http: HttpClient) {
  }

  //==================================GET TWEETS=======================================
  getPlayground(id: number) {
    return this.http.get<IPlayground[]>(this.BASE_URL + "glittertweet/getplayground/" + id);
  }

  getTweetById(id: number) {
    return this.http.get<string>(this.BASE_URL + "glittertweet/gettweetbyid/" + id);
  }

  getTweetBySearch(searchParam: string) {
    return this.http.get<IPlayground[]>(this.BASE_URL + "glittertweet/gettweetsbysearch?searchParam=" + searchParam);
  }

  //================================GET ANALYSIS======================================
  getAnalysis() {
    return this.http.get<IAnalysis>(this.BASE_URL + "analysis/");
  }

  //===============================GET CONNECTIONS===================================
  getConnections(uid: number, flag: boolean) {
    return this.http.get<IPerson[]>(this.BASE_URL + "connection?uid=" + uid + "&flag=" + flag);
  }

  //===============================GET REACTION=====================================
  getReaction(id: number, flag: boolean) {
    return this.http.get<IPerson[]>(this.BASE_URL + "reaction?id=" + id + "&flag=" + flag);
  }

  //==============================GET USER FOR SEARCH PARAMETER=====================
  getUserBySearch(searchParam: string) {
    return this.http.get<IPerson[]>(this.BASE_URL + "user?searchParam=" + searchParam);
  }

  //================================GET USER BY ID==================================
  getUserById(id: number) {
    return this.http.get<IProfile>(this.BASE_URL + "user/get/" + id);
  }


  //=========================================POST METHODS==========================================================

  //====================================USER REGISTRATION==========================================================
  postRegisterData(value: IRegister) {
    return this.http.post<any>(this.BASE_URL + "user/register", value);
  }

  //====================================USER login==================================================================
  postLoginData(value: ILogin) {
    return this.http.post<boolean>(this.BASE_URL + "user/login", value);
  }

  //====================================REACT ON A TWEET==========================================================
  postReactionData(value: IReaction) {
    return this.http.post<boolean>(this.BASE_URL + "reaction/postreaction", value);
  }

  //====================================POST A NEW TWEET==========================================================
  postTweetData(value: ITweetPost) {
    return this.http.post<boolean>(this.BASE_URL + "glittertweet/posttweet", value);
  }

  //====================================FOLLOW/UNFOLLLOW A PERSON==========================================================
  postConnectionData(value: IReaction) {
    return this.http.post<boolean>(this.BASE_URL + "connection/postconnection", value);
  }

  //====================================DELETE TWEET==========================================================
  deleteTweetData(deleteId: number) {
    return this.http.delete<boolean>(this.BASE_URL + "glittertweet/DeleteTweet?deleteId=" + deleteId);
  }

  //====================================EDIT TWEET===========================================================
  editTweetData(value: ITweetEdit) {
    return this.http.put<boolean>(this.BASE_URL + "glittertweet/edittweet", value);
  }

  Logout() {
    return this.http.get<void>(this.BASE_URL + "user/logout");
  }

  validUser(){
    if(sessionStorage.getItem("sessionId") !== null){
      return true;
    }
    else{
      return false;
    }
  }

  userId(){
    if(!this.validUser)
    return null;
    else{
      return (+sessionStorage.getItem("sessionId"));
    }
  }

}

@Injectable()
export class AlwaysAuthGuard implements CanActivate {
  constructor(private route : Router){

  }
  canActivate() {
    console.log("AlwaysAuthGuard");
    if(sessionStorage.getItem("sessionId") !== null){
      return true;
    }
    else{
      window.alert("Access Denied !!");
      this.route.navigate(['/']);
    }
  }
}
