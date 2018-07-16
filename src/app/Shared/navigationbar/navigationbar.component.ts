import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.scss']
})
export class NavigationbarComponent implements OnInit {

  constructor(private data: DataService, private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    if (!this.data.validUser()) {
      window.alert("Already logged out !");
    }
    else {
      sessionStorage.clear();
      this.data.Logout();
      this._router.navigate(['/']);
      window.alert("Logged Out Successfully !");
    }
  }

}
