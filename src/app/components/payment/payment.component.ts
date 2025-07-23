import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute, private _CartService:CartService) { }

  cartId: string | null = '';

  orderForm: FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl('')
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params)=>{
        this.cartId = params.get('id');
        // console.log('Cart ID:', this.cartId);
      }
    })
  }

  hundleForm(): void {
    // console.log('Form Submitted:', this.orderForm.value);
    this._CartService.checkOut(this.cartId, this.orderForm.value).subscribe({
      next: (response) => {
        // console.log('Checkout response:', response);
        if(response.status === 'success') {
          window.open(response.session.url, '_self');
        }
      },
      error: (err) => {
        console.error('Checkout error:', err);
      }
    });
  }
}
