import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProducts:any=[]
  searchKey:string=""

constructor (private api:ApiService,private toaster:ToastrService){}
ngOnInit(): void {
  this.getAllproducts();
  this.api.searchTerm.subscribe((res:any)=>{
    this.searchKey = res
  })
}

  getAllproducts(){
    this.api.getAllproductsAPI().subscribe({
      next:(res:any)=>{
        this.allProducts=res
      },
      error:(reason:any)=>{
        console.log(reason);
      }
    })
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      //proceed to wishlist
      this.api.addtowishlistAPI(product).subscribe({
        next:(res:any)=>{
          alert(`Product '${res.title}' added to your wishlist`)
          this.api.getWishlistCount();
        },
        error:(reason:any)=>{
          console.log(reason);
          this.toaster.warning(reason.error)
        }
      })
    }else{
      this.toaster.warning('Please Login')
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