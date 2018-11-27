import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/dbAccess/item.service';
import { CartService } from 'src/app/services/dbAccess/cart.service';
import { CategoryService } from 'src/app/services/dbAccess/category.service';
import { Observable, Subscription } from 'rxjs';
import { ItemModel } from 'src/app/services/models/item-model';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserModel } from '../services/models/user-model';
import * as firebase from 'firebase'

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  carts: any[];
  totalCost = 0;
  userModel: UserModel;
  locationForm = new FormGroup({
    street: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  checkOut = false;

  constructor(private router : Router, itemService: ItemService,private cartService: CartService, private auth: AuthService) {
    auth.userModel$.subscribe(userModel => this.userModel = userModel)
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.cartService.getAll(user.uid).subscribe(products => {
          this.carts= products;
          this.carts.forEach(i => this.totalCost += parseFloat(i.payload.val()['Price']))
        });
      } else {
        this.router.navigate(['sign-in'])
      }
    })
  }

  ngOnInit() {

  }

  getAllItems(){
    let items ={}
    let i = 1;
    this.carts.forEach(p=> {
      if(p.payload.val()['Size']){
        items["item" + i] = {
          "ItemName": p.payload.val()['ItemName'],
          "ItemDescription": p.payload.val()['ItemDescription'],
          "Price": p.payload.val()['Price'],
          "Size": p.payload.val()['Size'],
          "ImageUrl": p.payload.val()['ImageUrl']
        }
      }else{
        items["item" + i] = {
          "ItemName": p.payload.val()['ItemName'],
          "ItemDescription": p.payload.val()['ItemDescription'],
          "Price": p.payload.val()['Price'],
          "ImageUrl": p.payload.val()['ImageUrl']
        }
      }
      i++
    })
    return items;
  }

  onCheckOut(locationForm){
    if(this.userModel.credit - this.totalCost > 0 && locationForm.valid){
      firebase.auth().onAuthStateChanged((user)=>{
        firebase.database().ref("sell").push({
          "user" : this.userModel.name,
          "street" : locationForm.controls['street'].value,
          "state" : locationForm.controls['state'].value,
          "zipCode" : locationForm.controls['zipCode'].value,
          "items" : this.getAllItems()
        });
        firebase.database().ref("users/" + user.uid).update({ credit : this.userModel.credit - this.totalCost})
        this.cartService.delete(user.uid);
        this.totalCost = 0;
      })
      this.checkOut = true;
    }
  }
}
