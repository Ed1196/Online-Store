import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  
  constructor(public Auth: AngularFireAuth, private route: ActivatedRoute) {
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
}
