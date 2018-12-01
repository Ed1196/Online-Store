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

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  userModel: UserModel;
  carts: any;
  total: number;
  
  constructor(private router : Router, private cartService: ShoppingCartService, private auth: AuthService) {}

  removeItem(i){
    this.cartService.delete(i);
    console.log(i);
  }

  clearCart(){
    this.cartService.clearCart();
  }
  

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        
        this.cartService.getAll(user.uid).subscribe(products => {
          this.carts = products;
          console.log(products);
        });
      } else {
        this.router.navigate(['sign-in'])
      }
    })
  }


}