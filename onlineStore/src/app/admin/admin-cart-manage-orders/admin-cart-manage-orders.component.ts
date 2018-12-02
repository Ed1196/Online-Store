import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/dbAccess/order.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'manage-orders',
  templateUrl: './admin-cart-manage-orders.component.html',
  styleUrls: ['./admin-cart-manage-orders.component.css']
})
export class AdminCartManageOrdersComponent implements OnInit {
  Orders: any[];

  constructor(private orderService: OrderService, private router: Router) {
   
   }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.orderService.getAdminOrders().subscribe(products => {
          this.Orders = products;
          console.log("Products: " + products);
        })
      } else {
        this.router.navigate(['sign-in'])
      }
    })
  }

}
