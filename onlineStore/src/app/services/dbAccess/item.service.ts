import { Injectable, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { Observable } from 'rxjs';
import { KeyModel } from '../models/key-model';
import { ItemModel } from '../models/item-model';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  @Input('key') key: KeyModel; 
  @Input('items') items: ItemModel;

  constructor(private dbAccess: AngularFireDatabase) {
  

    interface ItemModel {
      identifier?: string;
      Categories ?: string;
      ImageUrl ?: string;
      ItemDescription ?: string;
      ItemName ?: string;
      Price ?: number;
      Size ?: string;
      SubCategories ?: string;    
      Quantity ?: number; 
      }

    interface KeyModel {

    identifier?: string;
    }

      
   }

  create(items) {
    return this.dbAccess.list('/Items').push(items);
  }

  getAll() {
    return this.dbAccess.list('/Items').snapshotChanges();
  }

  
  get(id: string) {
    return this.dbAccess.object('/Items/' + id).valueChanges();
  }

  update(id, Item) {
    return this.dbAccess.object('/Items/' + id).update(Item);
  }

  delete(id) {
    return this.dbAccess.object('/Items/' + id).remove();
  }

  updateQuantity(id, newQuanity){
   
      if (newQuanity === 0) {
        this.delete(id);
      } else {
      this.dbAccess.object('/Items/' + id).update({
        Quantity: newQuanity + "",
      });
    }

  }

  getKey(){
    return this.dbAccess.list<KeyModel>('/Items/${identifiers}').valueChanges();
  }

  getAllItemWithKey(){

    firebase.database().ref("Items").once('value').then((snapshot => {  
        return snapshot.val();
      }));
      
  }

  
      
}
