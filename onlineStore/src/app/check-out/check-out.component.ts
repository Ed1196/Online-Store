import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/dbAccess/shopping-cart.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { CartModel } from '../services/models/cart-model';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/dbAccess/order.service';
import { UserModel } from '../services/models/user-model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
  userModel: UserModel;
  carts: any[];
  shipping = {};
  total = 0;
  totalPrice = 0;
  userSubscription: Subscription;
  userID: string;
  
  
  constructor( 
              
              private cartService: ShoppingCartService, 
              private router : Router,
              private dbAccess: AngularFireDatabase,
              private orderService: OrderService,
              private authService: AuthService) {

  }

  placeOrder() {
    let order = this.orderService.createOrder(this.carts, this.shipping); 
    this.orderService.saveOrder(order);
    this.router.navigate(['orders-summary']);
  }    

  async ngOnInit() {
    
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.cartService.getAll(user.uid).subscribe(products => {
          this.userID = user.uid
          this.carts = products;
        })
      } else {
        this.router.navigate(['sign-in'])
      }
    })
  

  }

  ngOnDestroy() {
   
  }
}
