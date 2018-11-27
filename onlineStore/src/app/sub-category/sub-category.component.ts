import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../services/dbAccess/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/dbAccess/category.service';
import { ShoppingCartService } from '../services/dbAccess/shopping-cart.service';
import { ItemModel } from '../services/models/item-model';

@Component({
  selector: 'sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit { 
  Items$;
  Keys$;
 
  id:string;
  @Input('category') category;
  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) { 
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.Items$ = itemService.getAll().map(prods => prods.map(p => p.payload.val()));
    this.Keys$ = itemService.getAll();
    
    }

  

    addToCart(item) {
      console.log(JSON.stringify(item, undefined,2));
      this.cartService.addToCart(item);
    }



  ngOnInit() {
    
  }

}
