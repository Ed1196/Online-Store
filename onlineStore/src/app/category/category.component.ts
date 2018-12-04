import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/dbAccess/item.service';
import { CategoryService } from '../services/dbAccess/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  subCategories$: Observable<any[]>;
id:string;
constructor(private categoryService: CategoryService,
  private itemService: ItemService,
  private router: Router,
  private route: ActivatedRoute) { 
  this.id = this.route.snapshot.paramMap.get('id');
  this.subCategories$ = this.categoryService.getSubCategories(this.id);
  }
  
  


  ngOnInit() {

  }

}
