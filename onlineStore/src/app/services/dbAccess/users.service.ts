import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';

import * as firebase from 'firebase';
import { UserModel } from 'src/app/services/models/user-model';
import { stringify } from '@angular/core/src/render3/util';



@Injectable()
export class UsersService {

  constructor(private dataBase: AngularFireDatabase) { }

    save(user: firebase.User){
      this.dataBase.object('/users/' + user.uid).update({
        name: user.displayName,
        email: user.email,
       
      });

    }

   

  

    getUser(uid: string): AngularFireObject<UserModel> {

      return this.dataBase.object('/users/' + uid);
    
    }

    getSingleUser(){
     
    }
  
}
