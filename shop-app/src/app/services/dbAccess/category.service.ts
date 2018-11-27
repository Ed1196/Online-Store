import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private dbAccess: AngularFireDatabase) { }

   

  getCategories() {
    return this.dbAccess.list('/Category').valueChanges();
  }

  getSubCategories(optionSelected) {
    console.log(optionSelected);
    return this.dbAccess.list('/SubCategory' + '/' + optionSelected ).valueChanges();
  }
}
