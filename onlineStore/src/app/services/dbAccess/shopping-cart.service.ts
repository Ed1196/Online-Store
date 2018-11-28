import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';
import { UserModel } from 'src/app/services/models/user-model';
import { take } from 'rxjs/operators';
import { CartModel } from '../models/cart-model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { CartItemModel } from '../models/cart-item-model';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

 
  constructor(private db: AngularFireDatabase) {  }
 
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
 
  private getItemInCart(cartId: string, itemId: string) {
    return this.db.object('/ShoppingCarts/' + cartId + '/Items/' + itemId);
  }

  

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    let cart = this.db.object('/shopping-carts/' + cartId).snapshotChanges();
    
    return cart;
  }
 
  private async getOrCreateCartId() {
    
 
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
 
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
 
  async addToCart(key: string) {
    const cartId = await this.getOrCreateCartId();
    const item: AngularFireObject<{}> = this.getItemInCart(cartId, key);
    item.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
      if (i.payload.val()) {
        item.update({ quantity: i.payload.val().quantity + 1, });
        this.updateTotal(cartId);
      } else {
        item.set({ product: key, quantity: 1 });
        this.createTotal(cartId);
      }
    });
  }

  async createTotal(cardId) {
    const itemRef = this.db.object('/ShoppingCarts/' + cardId + '/Total');

    itemRef.set({ Total: 0});
  }
  
  async updateTotal(cardId) {
    const itemRef: AngularFireObject<{}> = this.db.object('/ShoppingCarts/' + cardId + '/Total');
    itemRef.update({ Total: 2})
  }

   getTotal(cardId: string){
    return this.db.list('/ShoppingCarts/' + cardId + '/Total').valueChanges();

  }

  async removeFromCart(key: string){
    const cartId = await this.getOrCreateCartId();
    const item: AngularFireObject<{}> = this.getItemInCart(cartId, key); 
    item.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
      if (i.payload.val()) {
        item.update({ quantity: i.payload.val().quantity - 1 });
      } else {
        item.set({ product: key, quantity: 1 });
      }
    });
  }
}
