import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
;
import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database'; 

import { AngularFireDatabase} from 'angularfire2/database'
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated'

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';


import { RouterModule, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
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
import { ItemFormComponent } from './admin/item-form/item-form.component';
import { AuthService } from './services/auth.service'
import { AuthGuardService } from './services/guards/auth-guard.service';
import { UsersService } from 'src/app/services/dbAccess/users.service';
import { AdminAuthGuardService } from './services/guards/admin-auth-guard.service';
import { CategoryService } from './services/dbAccess/category.service';
import { ItemService } from './services/dbAccess/item.service';
import { EditFormComponent } from './admin/edit-form/edit-form.component';

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
    ItemFormComponent,
    EditFormComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'cart-page', component: CartPageComponent},
      { path: 'category/:id', component: CategoryComponent },
      { path: 'category/sub-category/:id', component: SubCategoryComponent},
      { path: 'category/sub-category/item-page', component: ItemPageComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'user-orders', component: UserOrdersComponent, canActivate: [AuthGuardService] },

      { path: 'admin/add-items/item-form', component: ItemFormComponent , canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'admin/add-items/edit-form/:id', component: EditFormComponent , canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'admin/add-items', component: AdminAddItemsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]  },
      { path: 'admin/manage-orders', component: AdminCartManageOrdersComponent , canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'admin/edit-items', component: AdminEditItemsComponent , canActivate: [AuthGuardService, AdminAuthGuardService] },
      
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UsersService,
    CategoryService,
    ItemService   
  ],
  bootstrap: [AppComponent]
})
export class AppModule{

  constructor(private auth: AuthService) {
   this.auth.saveUser(); 
  }

 }
