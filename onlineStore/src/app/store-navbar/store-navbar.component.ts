import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'src/app/services/auth.service'
import * as firebase from 'firebase';

@Component({
  selector: 'store-navbar',
  templateUrl: './store-navbar.component.html',
  styleUrls: ['./store-navbar.component.css']
})
export class StoreNavbarComponent {
  $user: Observable<firebase.User>;

  constructor(private auth: AuthService) {
    
  }

  login(){
    this.auth.doLogin();
  }


  logout(){
    this.auth.doLogout();
  }

  ngOnInit() {
  }

}
