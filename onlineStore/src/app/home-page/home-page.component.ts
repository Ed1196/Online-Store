import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/dbAccess/item.service';
import { CategoryService } from '../services/dbAccess/category.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/dbAccess/shopping-cart.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent{
  Items$: Observable<any[]>;
  Categories$: Observable<any[]>;
  images = [].map(() => ``);

  products: any[];
  filterProducts: any[];
  subscription: Subscription;


  constructor(private itemService: ItemService,
             private categoryService: CategoryService, 
              private route:Router,
              private cartService: ShoppingCartService) { 
    this.Items$ = itemService.getAll()
    .map(prods => prods
      .map(p => p.payload.val()));

    this.Categories$ = this.categoryService.getCategories();

    this.subscription = this.itemService.getAll()
    .subscribe(products => {
      this.filterProducts = this.products = products;

    
    });
    
  }

  goToCategory(category) {
    //console.log(JSON.stringify(category, undefined,2));
    this.route.navigate(['/category'+ '/' + category]);
  }

  removeFromCart(itemId) {
      
    this.cartService.delete(itemId);
  }

  addToCart(item) {
    //console.log(item);
    this.cartService.addToCart2(item);
  }

  filter(query: string){
    this.filterProducts = (query) ?
      this.products.filter(p => p.payload.val()['ItemName'].toLowerCase().includes(query.toLocaleLowerCase())):
      this.products;
  }

  

  ngOnInit() {
   
  }
  

}
