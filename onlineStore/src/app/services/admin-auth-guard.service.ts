import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { CanActivate } from '@angular/router';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UsersService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
      .switchMap(user => this.userService.getUser(user.uid).valueChanges())
      .map(UserModule => UserModule.Admin);
  }

}
