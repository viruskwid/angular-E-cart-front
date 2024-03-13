import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  searchTerm = new BehaviorSubject("")
  cartCount =new BehaviorSubject(0)
  wishlistCount =new BehaviorSubject(0)
  SERVER_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {
    if(sessionStorage){
      this.getWishlistCount();
    }
  }

  getAllproductsAPI() {
    return this.http.get(`${this.SERVER_URL}/all-products`);
  }
  
  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`,user)
  }

  viewProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/view-product/${id}`)
  }

  appendTokenHeader(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addtowishlistAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-wishlist`,product,this.appendTokenHeader())
  }
  getWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/get-wishlist`,this.appendTokenHeader())
  }
  getWishlistCount(){
    this.getWishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  removeWishlistItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/wishlist-remove/${id}`,this.appendTokenHeader())
  }
  addToCartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-cart`,product,this.appendTokenHeader())
  }

  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/get-cart`,this.appendTokenHeader())
  }
  getCartCount(){
    this.getCartAPI().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
  }
  removeCartItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/remove-cart/${id}`,this.appendTokenHeader())
  }
  incrementCartAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart-increment/${id}`,this.appendTokenHeader())
  }
  decrementCartAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart-decrement/${id}`,this.appendTokenHeader())
  }

  emptycartAPI(){
    return this.http.delete(`${this.SERVER_URL}/empty-cart`,this.appendTokenHeader())
  }
  isLoggedin(){
    // the !! used for boolen
    return !!sessionStorage.getItem("token")
  }
}
