import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  totalAmount:string=""
  payPalConfig ? : IPayPalConfig;

  checkOutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    address: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    pincode: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  });
  checkoutStatus:boolean=false

 constructor(private fb:FormBuilder,private api:ApiService,private router:Router){}
 cancel(){
  this.checkOutForm.reset()
 }
 
 proceed(){
  if (this.checkOutForm.valid) {
    this.checkoutStatus=true 
    if (sessionStorage.getItem("cartTotalPrice")) {
      this.totalAmount = sessionStorage.getItem("cartTotalPrice") || ""
      this.initConfig()
    }
  } else {
    alert("Invalid form")
  }
 }
 initConfig(): void {
  this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'USD',
                  value:  this.totalAmount,
                  breakdown: {
                      item_total: {
                          currency_code: 'USD',
                          value: this.totalAmount
                      }
                  }
              },
    
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'vertical'
      },
      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details:any) => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
          });

      },
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          this.api.emptycartAPI().subscribe((res:any)=>{
            this.api.getCartCount()
            alert("order placed successfully...")
            this.checkoutStatus = false
            this.checkOutForm.reset()
            this.router.navigateByUrl("/")
          })
      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
          alert("Transaction cancelled..........")
          this.checkoutStatus = false

      },
      onError: err => {
          console.log('OnError', err);
          alert("transaction failed")
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
          
      }
  };
}

}
