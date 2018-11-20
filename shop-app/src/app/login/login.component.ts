import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';

//import { CustomerService } from '../shared/customer.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public Auth: AngularFireAuth) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  ngOnInit() {
  }

  message = false;
  //isLogin = (localStorage.getItem(keyName)== null)?false:true;

  //console.log(email);
  onLogin(loginForm) {
    this.doLogin(loginForm)
    var ref = firebase.database().ref("user");
    ref.on("value", function(snapshot) {
      let emailKey = loginForm.controls['email'].value.replace(/\./g, ',');
      console.log(snapshot.child(emailKey).val());
      let x = snapshot.child(emailKey).val();
      window.sessionStorage.setItem("user", JSON.stringify(x));
      console.log(x["isAdmin"]);
    }, function (error) {
        console.log("Error: " + error.code);
    });
  };

  doLogin(loginForm){
  firebase.auth().signInWithEmailAndPassword(loginForm.controls['email'].value, loginForm.controls['password'].value)
      .then(function(firebaseUser){
        console.log("ok");
      }).catch(function(error){
        console.log(error);
      })
  };
}
