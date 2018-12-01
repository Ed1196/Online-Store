import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/dbAccess/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
  shipping = {}; 
  
  constructor(private cart: ShoppingCartService) {

    

  }

  placeOrder() {
    console.log(this.shipping);
  }    

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
