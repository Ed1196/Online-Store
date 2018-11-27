import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from 'src/app/services/dbAccess/item.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'edit-items',
  templateUrl: './admin-edit-items.component.html',
  styleUrls: ['./admin-edit-items.component.css']
})
export class AdminEditItemsComponent implements OnInit, OnDestroy {
  products: any[];
  filterProducts: any[];
  subscription: Subscription;

  constructor(private itemService: ItemService ) {
    this.subscription = this.itemService.getAll()
    .subscribe(products => {
      this.filterProducts = this.products = products;
    });
  }

  ngOnInit() {

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query: string){
    this.filterProducts = (query) ?
      this.products.filter(p => p.payload.val()['ItemName'].toLowerCase().includes(query.toLocaleLowerCase())):
      this.products;
  }

}
