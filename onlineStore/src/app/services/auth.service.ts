import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { UserModel } from './models/user-model';
import { UsersService } from './users.service';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  
  constructor(private userService: UsersService, 
              private Auth: AngularFireAuth, 
              private route: ActivatedRoute) {
    this.user$ = Auth.authState;
  
  }

  doLogin(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '';
    localStorage.setItem('returnUrl', returnUrl);

    this.Auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  doLogout() {
    this.Auth.auth.signOut();
  }

  getState() {
    return this.Auth.authState;
  }

  get userModel$() : Observable<UserModel> {
      return this.user$
        .switchMap( user => {
          if (user) {
          return this.userService.getUser(user.uid).valueChanges();
          } else {
            return of(null);
          }
        });


  }
}
