import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from '../dbAccess/users.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { CanActivate } from '@angular/router';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UsersService) { }

  canActivate(): Observable<boolean> {
    let booleanIsAdmin = this.auth.userModel$
    .map(userModel => {
        //console.log(`DBuG: userModel.Admin=`, userModel.Admin);
        return userModel.Admin;
    });
    //console.log(`DBuG: userModel.Admin=`, booleanIsAdmin);
    return booleanIsAdmin;
  }

}
