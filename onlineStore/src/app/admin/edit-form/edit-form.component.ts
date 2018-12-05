import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/dbAccess/item.service';
import { CategoryService } from 'src/app/services/dbAccess/category.service';
import { Observable } from 'rxjs';
import { ItemModel } from 'src/app/services/models/item-model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  categories$: Observable<any[]>;
  subCategories$: Observable<any[]>;
  optionSelected: string;
  optionSelected2: string;
  Item: any = {};
  id: any;

  constructor(private categoryService: CategoryService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.categories$ = this.categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.itemService.get(this.id).subscribe(p => this.Item = p);
    }

    onOptionsSelected(event): void{
      //console.log(JSON.stringify(event, undefined,2));
      this.subCategories$ = this.categoryService.getSubCategories(this.optionSelected)
    }
  
    onOptionsSelected2(event): void{
      //console.log(JSON.stringify(event, undefined,2));
      
    }
    
    save(item){
      if(this.id) this.itemService.update(this.id, item);
      else this.itemService.create(item);


      this.router.navigate(['/admin/edit-items']);
    }

    delete() {
      if(confirm('Are you sure?')) {
        this.itemService.delete(this.id);
        this.router.navigate(['/admin/edit-items']);
      }
    }

  ngOnInit() {
  }

}
