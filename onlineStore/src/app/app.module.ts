import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { StoreNavbarComponent } from './store-navbar/store-navbar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { AdminCartManageOrdersComponent } from './admin/admin-cart-manage-orders/admin-cart-manage-orders.component';
import { AdminEditItemsComponent } from './admin/admin-edit-items/admin-edit-items.component';
import { AdminAddItemsComponent } from './admin/admin-add-items/admin-add-items.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreNavbarComponent,
    SignInComponent,
    SignUpComponent,
    CategoryComponent,
    SubCategoryComponent,
    ItemPageComponent,
    CartPageComponent,
    AdminCartManageOrdersComponent,
    AdminEditItemsComponent,
    AdminAddItemsComponent,
    CheckOutComponent,
    HomePageComponent,
    UserOrdersComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'cart-page', component: CartPageComponent},
      { path: 'category', component: CategoryComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'item-page', component: ItemPageComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'sub-category', component: SubCategoryComponent},
      { path: 'user-orders', component: UserOrdersComponent},
      { path: 'admin/add-items', component: AdminAddItemsComponent },
      { path: 'admin/manage-orders', component: AdminCartManageOrdersComponent },
      { path: 'admin/edit-items', component: AdminEditItemsComponent }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
