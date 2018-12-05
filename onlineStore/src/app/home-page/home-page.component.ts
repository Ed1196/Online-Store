import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/dbAccess/item.service';
import { CategoryService } from '../services/dbAccess/category.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent{
  Items$: Observable<any[]>;
  Categories$: Observable<any[]>;
  images = [].map(() => ``);


  constructor(private itemService: ItemService, private categoryService: CategoryService, private route:Router) { 
    this.Items$ = itemService.getAll()
    .map(prods => prods
      .map(p => p.payload.val()));

    this.Categories$ = this.categoryService.getCategories();
  }

  goToCategory(category) {
    //console.log(JSON.stringify(category, undefined,2));
    this.route.navigate(['/category'+ '/' + category]);
  }


  ngOnInit() {
  }

}
