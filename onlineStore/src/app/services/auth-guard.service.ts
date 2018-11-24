import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private userService: UsersService) { }

    canActivate(route, state: RouterStateSnapshot) {
      return this.auth.user$.map(user => {
        if(user) return true;

        this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url }});
        return false;
      });
    }


}
