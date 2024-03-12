import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
 product:any = {}

 constructor(private route:ActivatedRoute,private api:ApiService,private toaster:ToastrService){}
 ngOnInit(): void {
   this.route.params.subscribe((res:any)=>{
    const {id} = res
    this.getProduct(id)

   })
 }
 getProduct(pid:any){
  this.api.viewProductAPI(pid).subscribe((res:any)=>{
    this.product = res
    console.log(this.product);
    
  })
 }

 addToWishlist(product:any){
  if(sessionStorage.getItem("token")){
    //proceed to wishlist
    this.api.addtowishlistAPI(product).subscribe({
      next:(res:any)=>{
        this.toaster.success(`Product '${res.title}' added to your wishlist`)
        this.api.getWishlistCount();
      },
      error:(reason:any)=>{
        console.log(reason);
        alert(reason.error)
      }
    })
  }else{
    this.toaster.info('Please Login')
  }
}
addToCart(product:any){
  if(sessionStorage.getItem("token")){
    product.quantity=1
    this.api.addToCartAPI(product).subscribe({
      next:(res:any)=>{
        alert(res)
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })

  }else{
    this.toaster.warning("Please login")
  }
}
}
