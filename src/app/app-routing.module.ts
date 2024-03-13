import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'',component:AllProductsComponent},
  {path:'view/:id',component:ViewproductComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'wishlist', canActivate:[authGuard],component:WishlistComponent},
  {path:'cart',canActivate:[authGuard],component:UserCartComponent},
  {path:'checkout',canActivate:[authGuard], component:CheckOutComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
