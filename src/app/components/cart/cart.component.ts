import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service.js';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [NgFor, CurrencyPipe, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService) { }

  cartItems: any = null;


  ngOnInit() {
    this._CartService.getCart().subscribe({
      next: (response) => {
        // console.log('Cart items:', response);
        this.cartItems = response;
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
      }
    });
  }
}
