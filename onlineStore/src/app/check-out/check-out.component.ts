import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/dbAccess/shopping-cart.service';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { CartModel } from '../services/models/cart-model';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/dbAccess/order.service';
import { UserModel } from '../services/models/user-model';
import { AuthService } from '../services/auth.service';
import { ItemService } from '../services/dbAccess/item.service';
import { CheckoutQueueService } from '../services/dbAccess/checkout-queue.service';
import { UsersService } from '../services/dbAccess/users.service';

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
  currentCredits: number;
  credits = 0;

  products: any[];
  filterProducts: any[];
  subscription: Subscription;

  error: any;

 
  
  constructor( 
              
              private cartService: ShoppingCartService, 
              private router : Router,
              private dbAccess: AngularFireDatabase,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private authService: AuthService,
              private itemService: ItemService,
              private checkoutService: CheckoutQueueService,
              private userService: UsersService) {

  }

  async placeOrder() {
    //console.log('Before: ' );

    let taken = await this.checkoutService.getQueue();
    //console.log('Taken: ' + taken);
    if(taken === false){

        this.checkoutService.blockQueue();

        
        let InStock = false;
        InStock = await this.orderService.checkStock(this.carts, this.products);
        console.log('InStock: ' + InStock);

   
        if(InStock){
          this.orderService.decreaseStock(this.carts, this.products);
          let order = await this.orderService.createOrder(this.carts, this.shipping); 
          this.orderService.saveOrder(order);
          this.userService.decreaseFunds(this.totalPrice, this.currentCredits);
          this.checkoutService.resetQueue();
          this.router.navigate(['orders-summary']);
         } else {
          this.router.navigate(['cart-page'], {queryParams: {error:'Item out of stock!'}});
         }

         this.checkoutService.resetQueue();
   } else {
      this.router.navigate(['cart-page'], {queryParams: {error:'Check-out is busy!'}});
    }
    
    
  }    

  async ngOnInit() {

    this.error = this.route.snapshot.queryParamMap.get('error');
    
    this.subscription = await this.itemService.getAll()
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

    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {

        this.cartService.getAll(user.uid).subscribe(products => {
          this.carts = products;
          //console.log("Products: " + products);
          this.carts.forEach(i => {
              this.total += i.payload.val()["quantity"];
              this.totalPrice = this.totalPrice + i.payload.val()["productId"]["Price"] * i.payload.val()["quantity"];
          })
        });

        firebase.database().ref('/users/' + user.uid).on('value', (snapshot) => {
          this.currentCredits = snapshot.val().Credits;
        });

      } else {
        this.router.navigate(['sign-in'])
      }
    })
  

  }

  ngOnDestroy() {
   
  }
}
