import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/dbAccess/item.service';
import { CategoryService } from '../services/dbAccess/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent{
  Items$;
  Categories$;

  constructor(private itemService: ItemService, private categoryService: CategoryService) { 
    this.Items$ = itemService.getAll()
    .map(prods => prods
      .map(p => p.payload.val()));
      this.Categories$ = this.categoryService.getCategories();
  }

  ngOnInit() {
  }

}
