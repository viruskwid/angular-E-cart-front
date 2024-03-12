import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

constructor(private api:ApiService){}
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

logout(){
  if(sessionStorage.getItem("existingUser")){
    sessionStorage.removeItem("existingUser")
  }
}


}
