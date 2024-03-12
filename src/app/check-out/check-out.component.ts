import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  checkOutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    address: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    pincode: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  });
  checkoutStatus:boolean=false

 constructor(private fb:FormBuilder){}
 cancel(){
  this.checkOutForm.reset()
 }
 
 proceed(){
  if (this.checkOutForm.valid) {
    this.checkoutStatus=true
  } else {
    alert("Invalid form")
  }
 }
}
