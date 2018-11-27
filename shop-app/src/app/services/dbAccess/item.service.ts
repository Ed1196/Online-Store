import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private dbAccess: AngularFireDatabase) { }

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
}
