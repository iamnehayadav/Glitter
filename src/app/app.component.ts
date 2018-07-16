import { Component } from '@angular/core';
import { NavigationbarComponent } from './Shared/navigationbar/navigationbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Front-end';

  checkSession(){
    if (sessionStorage.getItem("sessionId") == null){
      return false;
    }
    else{
      return true;
    }
  }
}
