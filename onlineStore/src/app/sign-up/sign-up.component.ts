import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    
    
    public registerForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      username: new FormControl('', Validators.required),
    });

    constructor(private router : Router, 
                public Auth: AngularFireAuth,
                private auth: AuthService) { }

    ngOnInit() {
    }

    onRegister(registerForm){
      this.auth.onRegister(registerForm);
      this.router.navigate(['/']);
    }
}