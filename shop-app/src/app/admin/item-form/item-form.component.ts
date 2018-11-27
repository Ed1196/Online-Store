import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/dbAccess/category.service';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/services/dbAccess/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  categories$: Observable<any[]>;
  subCategories$: Observable<any[]>;
  optionSelected: Observable<any>;
  optionSelected2: Observable<any>;
  Item = {};

  constructor(private categoryService: CategoryService,
              private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute) {
    this.categories$ = this.categoryService.getCategories();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.itemService.get(id).subscribe(p => this.Item = p);
  }

  onOptionsSelected(event): void{
    console.log(JSON.stringify(event, undefined,2));
    this.subCategories$ = this.categoryService.getSubCategories(this.optionSelected)
  }

  onOptionsSelected2(event): void{
    console.log(JSON.stringify(event, undefined,2));

  }

  save(item){
    this.itemService.create(item);
    this.router.navigate(['/admin/edit-items']);
  }



  ngOnInit() {

  }

}
