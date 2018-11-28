import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../services/dbAccess/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/dbAccess/category.service';
import { ShoppingCartService } from '../services/dbAccess/shopping-cart.service';
import { ItemModel } from '../services/models/item-model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit { 
  products: any[];
  filterProducts: any[];
  subscription: Subscription;
  Total: any[];
 
  id:string;
  @Input('category') category;
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) { 
      
      this.id = this.route.snapshot.paramMap.get('id');
      
    this.subscription = this.itemService.getAll()
    .subscribe(products => {
      this.filterProducts = this.products = products;

    
    });
    
    }
  
    removeFromCart(item) {
      this.cartService.removeFromCart(item);
    }

    addToCart(item) {
      console.log(JSON.stringify(item, undefined,2));
      this.cartService.addToCart(item);
      console.log(this.cartService.getTotal(item))
    }



  ngOnInit() {
     
  } 

}
