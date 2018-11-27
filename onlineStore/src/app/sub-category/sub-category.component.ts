import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/dbAccess/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/dbAccess/category.service';

@Component({
  selector: 'sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit { 
  Items$: Observable<any[]>;
  id:string;
  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.Items$ = itemService.getAll().map(prods => prods.map(p => p.payload.val()));
    }
  ngOnInit() {
    
  }

}
