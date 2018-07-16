import { Component, OnInit } from '@angular/core';
import {ILogin} from '../interface';
import {DataService} from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private data : DataService, private _router: Router) { }
  ngOnInit() {
  }

  loginUserDetails(email, password) {
    const inputParam: ILogin = {
      email: email,
      password: password
    };

    if(email == null || email == ""){
      alert("Error ! Incorrect email address");
    }
    else if(password == null || password == ""){
      alert("Error ! Incorrect Password");
    }
    this.data.postLoginData(inputParam)
      .subscribe((event:any) => {
        console.log(event);
        
        if(event != 0){
          sessionStorage.setItem("sessionId",event.toString());
          this._router.navigate(['/playground']);
        }
        else{
          window.alert("UserName or Password is Incorrect");
          this._router.navigate(["/"]);
        }
      });
  }
}
