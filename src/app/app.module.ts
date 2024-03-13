import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { AllProductsComponent } from './all-products/all-products.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './check-out/check-out.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { SearchPipe } from './pipe/search.pipe';
@NgModule({
  declarations: [
AppComponent,
HeaderComponent,
FooterComponent,
LoginComponent,
RegisterComponent,
AllProductsComponent,
ViewproductComponent,
WishlistComponent,
UserCartComponent,
CheckOutComponent,
SearchPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
