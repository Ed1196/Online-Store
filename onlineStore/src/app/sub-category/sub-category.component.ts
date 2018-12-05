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
  
    removeFromCart(itemId) {
      
      this.cartService.delete(itemId);
    }

    addToCart(item) {
      //console.log(item);
      this.cartService.addToCart2(item);
    }



  ngOnInit() {
     
  } 
  filter(query: string){
    this.filterProducts = (query) ?
      this.products.filter(p => p.payload.val()['ItemName'].toLowerCase().includes(query.toLocaleLowerCase())):
      this.products;
  }

}