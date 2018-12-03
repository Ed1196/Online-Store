import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { ShoppingCartService } from './shopping-cart.service';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,  
    private cartService: ShoppingCartService, 
    private router : Router,
    private orderService: OrderService,
    private authService: AuthService,
    private itemService: ItemService) { }
    

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

  async checkStock(carts, products){
      let InStock: boolean = false;
      console.log(carts);
      carts.forEach(i => {
          
        products.forEach(j => {
          
            if(i.key === j.key )  {
              console.log("present");

              if(i.payload.val()["quantity"] > j.payload.val()["Quantity"]){
                console.log("Not enought items!")
                InStock = false;

              } else {
                console.log("Enought items!")
                let newQuantity =   ( j.payload.val()["Quantity"] ) - ( i.payload.val()["quantity"] ); 
                console.log('NewQuantity: ' + newQuantity);
                this.itemService.updateQuantity(j.key, newQuantity);
                InStock = true;
              }

            } else {
              console.log("not present")
              InStock = false;
            }
        
        })
    })
      return InStock;
  }
}
