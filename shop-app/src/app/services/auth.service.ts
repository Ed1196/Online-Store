import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { UserModel } from './models/user-model';
import { UsersService } from 'src/app/services/dbAccess/users.service';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UsersService,
              private Auth: AngularFireAuth,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private router: Router) {
    this.user$ = Auth.authState;

  }

  doLogin(){
    this.Auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }

  doLogout() {
    this.Auth.auth.signOut();
  }

  doLoginEmail(loginForm){
    this.Auth.auth.signInWithEmailAndPassword(
      loginForm.controls['email'].value,
      loginForm.controls['password'].value)
        .then((firebaseUser) => {
           console.log(firebaseUser)
        }).catch((error) => {
           console.log(error)
        })
  }

  saveUser() {
    this.user$.subscribe( user => {
      if (user) {
        this.usersService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if(returnUrl){
          localStorage.removeItem('returnUrl')
          this.router.navigateByUrl(returnUrl);
        }
      }
    })
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
