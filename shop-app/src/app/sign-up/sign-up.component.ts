import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    registerForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      username: new FormControl('', Validators.required),
    });

    constructor(private router : Router, public Auth: AngularFireAuth) { }

    ngOnInit() {
    }

    onRegister(registerForm){
      //create username and password
      firebase.auth().createUserWithEmailAndPassword(registerForm.controls['email'].value, registerForm.controls['password'].value)
      //check after login/ save get uid and save add data to userId
      firebase.auth().onAuthStateChanged((user)=>{
          if(user){
            firebase.database().ref("users").child(user.uid).set({
              "email": registerForm.controls['email'].value,
              "name": registerForm.controls['username'].value,
              "Admin": false
            });
          }
        })
    }
}