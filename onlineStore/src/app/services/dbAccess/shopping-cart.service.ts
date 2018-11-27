import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';

import * as firebase from 'firebase';
import { UserModel } from 'src/app/services/models/user-model';
import { take } from 'rxjs/operators';


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
 
  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
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
    const item: AngularFireObject<{}> = this.db.object('/ShopingCarts/' + cartId + '/Items/' + key);
    item.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
      if (i.payload.val()) {
        item.update({ quantity: i.payload.val().quantity + 1 });
      } else {
        item.set({ product: key, quantity: 1 });
      }
    });
 
  }
}
