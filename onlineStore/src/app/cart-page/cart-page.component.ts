import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/dbAccess/shopping-cart.service';
import { CategoryService } from 'src/app/services/dbAccess/category.service';
import { Observable, Subscription} from 'rxjs';
import { ItemModel } from 'src/app/services/models/item-model';
import { AuthService } from 'src/app/services/auth.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserModel } from '../services/models/user-model';
import * as firebase from 'firebase'
import { ItemService } from '../services/dbAccess/item.service';
import { UsersService } from '../services/dbAccess/users.service';

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  userModel: UserModel;
  carts: any[];
  total = 0;
  totalPrice = 0;
  currentCredits: number;
  credits = 0;
  
  
  constructor(private router : Router, 
              private cartService: ShoppingCartService, 
              private auth: AuthService,
              private userService: UsersService) {}

 checkout(){
    console.log('total: ' + this.totalPrice);
    console.log('current: ' + this.currentCredits);
    if(this.totalPrice > this.currentCredits){
      console.log('Not enought credits!');
    } else {
      console.log('enought credits!');
      var user = firebase.auth().currentUser;
      this.router.navigate(['check-out/' + user.uid]);
    }
  }

  removeItem(i){
    this.cartService.delete(i);
    this.total = 0;
    this.totalPrice = 0;

  }

  clearCart(){
    this.cartService.clearCart();
  }
  

  ngOnInit() {


    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {

        this.cartService.getAll(user.uid).subscribe(products => {
          this.carts = products;
          console.log("Products: " + products);
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


}