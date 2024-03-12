import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit{
allProducts :any =[]
coupnClick:boolean=false
couponStatus:boolean=false
cartTotalPrice:number=0
constructor(private api:ApiService ,private router:Router){}
ngOnInit(): void {
  this.getCart()
}
getCart(){
  this.api.getCartAPI().subscribe({
    next:(res:any)=>{
      this.allProducts = res
      this.getCartTotal()
    },
    error:(reason:any)=>{
      console.log(reason);
      
    }
  })
}

deleteItem(id: any) {
  this.api.removeCartItemAPI(id).subscribe({
    next: (res: any) => {
      this.getCart()
      this.api.getCartCount()
    },
    error: (reason: any) => {
      console.log(reason.error);
    }
  })
}

incrementQuantity(id:any){
  this.api.incrementCartAPI(id).subscribe({
    next:(res:any)=>{
      this.getCart()
      this.api.getCartCount()
    },
    error:(reason:any)=>{
      console.log(reason.error);
      
    }
   
  })
}
decrementQuantity(id:any){
  this.api.decrementCartAPI(id).subscribe({
    next:(res:any)=>{
      this.getCart()
      this.api.getCartCount()
    },
    error:(reason:any)=>{
      console.log(reason.error);
      
    }
   
  })
}
emptyCart(){
  this.api.emptycartAPI().subscribe({
    next:(res:any)=>{
       this.getCart()
       this.api.getCartCount()
    },
    error:(reason:any)=>{
      console.log(reason.error);
      
    }
  })
}
getCoupon(){
 this.couponStatus = !this.couponStatus
}
getCartTotal(){
  this.cartTotalPrice = Math.ceil(this.allProducts.map((product:any)=>product.totalPrice).reduce(((p1:any,p2:any)=>p1+p2)))

}
discount5(){
  this.coupnClick=true
  let discount = Math.ceil(this.cartTotalPrice*0.1)
  this.cartTotalPrice -= discount
}
discount20(){
  this.coupnClick=true
  let discount = Math.ceil(this.cartTotalPrice*0.2)
  this.cartTotalPrice -= discount
}
discount50(){
  this.coupnClick=true
  let discount = Math.ceil(this.cartTotalPrice*0.5)
  this.cartTotalPrice -= discount
}
checkout(){
  sessionStorage.setItem("cartTotalPrice",JSON.stringify(this.cartTotalPrice))
  this.router.navigateByUrl('/checkout')
}
}
