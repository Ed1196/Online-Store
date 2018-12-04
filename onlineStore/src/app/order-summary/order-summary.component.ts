import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/dbAccess/order.service';


@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  orders;

  constructor(private orderService: OrderService) {
    
   }

  ngOnInit() {
  }

}
