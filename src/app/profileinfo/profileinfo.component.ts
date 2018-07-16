import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profileinfo',
  templateUrl: './profileinfo.component.html',
  styleUrls: ['./profileinfo.component.scss']
})
export class ProfileinfoComponent implements OnInit {
@Input() user;
  constructor(private data : DataService, private _route : Router) { }

  ngOnInit() {
    if (!this.data.validUser()) {
      window.alert("Access Denied !!")
      this._route.navigate(['/']);
    }
  }

}
