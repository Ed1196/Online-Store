import { Injectable } from '@angular/core';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import * as firebase from 'firebase'
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { UserModel } from 'src/app/services/models/user-model';
import { take } from 'rxjs/operators';
import { UsersService } from './users.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {



  constructor(private dbAccess: AngularFireDatabase , private userService: UsersService, private router : Router) { }

  addToCart2(product) {

   
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {

       
        let cartId = user.uid;
        const items: AngularFireObject<{}> = this.dbAccess.object('/ShoppingCarts/' + cartId +"/"+ product.key);
        
        
        items.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
          if (i.payload.val()) {
            items.update({ quantity: i.payload.val().quantity + 1 });
         
          } else {
            items.set({ productId: product.payload.val(), quantity: 1 });
        
          }
        });
       

      }else{
        this.router.navigate(['sign-in']);
      }
    })
 
  
  }

  getAll(id) {
    return this.dbAccess.list("/ShoppingCarts/" + id).snapshotChanges();
  }

  clearCart() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.dbAccess.list('/ShoppingCarts/' + user.uid).remove();
        return "good"
      }else{
        return "fail";
      }
    })

  }

  delete(id) {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user && confirm('Are you sure you want to delete from your cart? ')) {
        this.dbAccess.list('/ShoppingCarts/' + user.uid + '/' + id).remove();
        return "good"
      }else{
        return "fail";
      }
    }) 
  }


  
}