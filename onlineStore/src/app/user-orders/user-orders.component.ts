import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/dbAccess/order.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  Orders: any[];

  constructor(private orderService: OrderService, private router: Router) {
  
   }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.orderService.getUserOrders(user.uid).subscribe(products => {
          this.Orders = products;
          //console.log("Products: " + products);
        })
      } else {
        this.router.navigate(['sign-in'])
      }
    })
  }

}
