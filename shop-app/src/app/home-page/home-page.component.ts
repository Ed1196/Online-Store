import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/dbAccess/item.service';
import { CartService } from '../services/dbAccess/cart.service';
import { UserModel } from '../services/models/user-model';
import { CategoryService } from '../services/dbAccess/category.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent{
  Items$;
  Categories$;
  userModel: UserModel;

  constructor(private cartService: CartService, private itemService: ItemService, private categoryService: CategoryService, private auth: AuthService, private dbAccess: AngularFireDatabase) {
    auth.userModel$.subscribe(userModel => this.userModel = userModel)
    this.Items$ = itemService.getAll()
    .map(prods => prods
      .map(p => p.payload.val()));
      this.Categories$ = this.categoryService.getCategories();
  }

  ngOnInit() {
  }

  addToCart(item){
    this.cartService.addToCart(item)
  }

}
