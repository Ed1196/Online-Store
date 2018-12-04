import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { UsersService } from '../dbAccess/users.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, 
              private router: Router, 
              private userService: UsersService) {}

    
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.auth.user$.map(user => {
        if(user) {
        console.log('user= ', user.uid);
        return true;
        } else {
        this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url }});
        return false;
        }
      });
    }


}
