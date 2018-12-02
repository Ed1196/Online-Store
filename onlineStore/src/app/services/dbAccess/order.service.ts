import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { ShoppingCartService } from './shopping-cart.service';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,  
    private cartService: ShoppingCartService, 
    private router : Router,
    private orderService: OrderService,
    private authService: AuthService) { }

  createOrder(carts, shipping){
    let total = 0;
    let totalPrice = 0;
    var user = firebase.auth().currentUser;

      carts.forEach(i => {
      total += i.payload.val()["quantity"];
      totalPrice = totalPrice + i.payload.val()["productId"]["Price"] * i.payload.val()["quantity"];
  })
   
    let order = {
      UserId: user.uid,
      DatePlaced: new Date().getTime(),
      ShippingAddress: shipping,
      Items: carts.map(i => {
        return {
          Item: {
            ItemName: i.payload.val()["productId"]["ItemName"],
            Price: i.payload.val()["productId"]["Price"],
            ImageUrl: i.payload.val()["productId"]["ImageUrl"],
            Quantity: i.payload.val()["quantity"],
          },
          
        } 
    }),
    Quantity: total,
    Total: totalPrice
    
    }

    return order;
  }

  getAdminOrders() {
    return this.db.list('/Orders').snapshotChanges();
  }

  getUserOrders(id: string){
    return this.db.list("/Orders/" + id).snapshotChanges();
  }

  async saveOrder(order){
    var user = firebase.auth().currentUser;
    let result = await this.db.list('/Orders/' + user.uid).push(order);
    this.cartService.clearCart();
    return result;
  }
}
