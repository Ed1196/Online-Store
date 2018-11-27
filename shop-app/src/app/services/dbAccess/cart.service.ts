import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class CartService {



  constructor(private dbAccess: AngularFireDatabase) { }

  addToCart(item) {
      firebase.auth().onAuthStateChanged((user)=>{
        if (user && confirm('Are you sure?, want to add to your cart')) {
          this.dbAccess.list('/Cart/' + user.uid).push(item);
          return "good"
        }else{
          return "fail";
        }
      })
  }

  getAll(id) {
    return this.dbAccess.list("/Cart/" + id).snapshotChanges();
  }

  delete(id) {
    return this.dbAccess.object('/Cart/' + id).remove();
  }

}
