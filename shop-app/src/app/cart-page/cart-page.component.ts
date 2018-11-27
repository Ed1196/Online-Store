import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/dbAccess/cart.service';
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
  carts: any[];
  constructor(private router : Router, private cartService: CartService, private auth: AuthService) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.cartService.getAll(user.uid).subscribe(products => {
          this.carts = products;
        });
      } else {
        this.router.navigate(['sign-in'])
      }
    })
  }


}
