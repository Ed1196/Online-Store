import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class CheckoutQueueService {

  constructor(private dbAccess: AngularFireDatabase) { }

  async getQueue(){
    
    return this.dbAccess.object('/Checkout/value')
    .valueChanges()
    .take(1)
    .toPromise();
  }

  blockQueue(){
    this.dbAccess.object('/Checkout/').update({
      value: true,
    });
  }

  resetQueue(){
    this.dbAccess.object('/Checkout/').update({
      value: false,
    });
  }

}
