import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AllProductsComponent } from '../all-products/all-products.component';
import { SearchPipe } from '../pipe/search.pipe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
constructor(private api:ApiService,private router:Router){}
ngOnInit(): void {
  if (sessionStorage.getItem("existingUser")) {
    this.loginUsername =JSON.parse(sessionStorage.getItem("existingUser") || "").username.split(" ")[0]
    this.api.wishlistCount.subscribe ((res:any)=>{
      this.wishlistCount = res
    })
    this.api.cartCount.subscribe((res:any)=>{
      this.cartCount= res
    })
  } else {
    this.loginUsername=""
  }
}
wishlistCount:number=0
cartCount:number=0
loginUsername:string=''

getSearchTearm(event:any){
 this.api.searchTerm.next(event.target.value)
}
logout(){
 sessionStorage.clear()
 this.loginUsername=""
 this.wishlistCount=0
 this.cartCount=0
 this.router.navigateByUrl("/")
}


}
