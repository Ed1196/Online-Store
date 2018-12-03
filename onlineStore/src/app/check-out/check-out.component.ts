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
import { ItemService } from '../services/dbAccess/item.service';
import { CheckoutQueueService } from '../services/dbAccess/checkout-queue.service';

@Component({
  selector: 'check-out',
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

  products: any[];
  filterProducts: any[];
  subscription: Subscription


  
  
  constructor( 
              
              private cartService: ShoppingCartService, 
              private router : Router,
              private dbAccess: AngularFireDatabase,
              private orderService: OrderService,
              private authService: AuthService,
              private itemService: ItemService,
              private checkoutService: CheckoutQueueService) {

  }

  async placeOrder() {
    console.log('Before: ' );
    let taken = await this.checkoutService.getQueue();
    console.log('Taken: ' + taken);
    if(taken === false){

        this.checkoutService.blockQueue();

        let order = await this.orderService.createOrder(this.carts, this.shipping); 
        let InStock: boolean = await this.orderService.checkStock(this.carts, this.filterProducts);
        console.log('InStock' + InStock);

   
        if(InStock){
          this.orderService.saveOrder(order);
          this.router.navigate(['orders-summary']);
         } else {
          this.router.navigate(['cart-page']);
         }
         this.checkoutService.resetQueue();
   } else {
      this.router.navigate(['check-out']);
    }
    
    
  }    

  async ngOnInit() {
    
    this.subscription = this.itemService.getAll()
    .subscribe(products => {
      this.filterProducts = this.products = products;

    
    });

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
