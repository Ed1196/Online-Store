import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public Auth: AngularFireAuth) { }

  ngOnInit() {
  }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone: new FormControl('', Validators.minLength(8))
  });

  onRegister(registerForm) {
    //create auth uesr
    firebase.auth().createUserWithEmailAndPassword(registerForm.controls['email'].value, registerForm.controls['password'].value)
    //save the user_profile to real_time database
    let emailKey = registerForm.controls['email'].value.replace(/\./g, ',');
    firebase.database().ref("user").child(emailKey).set({
      "email": registerForm.controls['email'].value,
      "username": registerForm.controls['username'].value,
      "street": registerForm.controls['street'].value,
      "state": registerForm.controls['state'].value,
      "zipCode": registerForm.controls['zipCode'].value,
      "phone": registerForm.controls['phone'].value,
      "isAdmin": false
    });
  }
    //this.router.navigate(['/doLogin']);
}
