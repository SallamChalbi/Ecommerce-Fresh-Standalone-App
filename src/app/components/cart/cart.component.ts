import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../../core/services/cart.service.js';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [NgFor, CurrencyPipe, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService, private  _Renderer2:Renderer2) { }

  cartItems: any = null;


  ngOnInit() {
    this._CartService.getCart().subscribe({
      next: (response) => {
        console.log('Cart items:', response);
        this.cartItems = response;
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
      }
    });
  }

  removeItem(id: string, elemeent: HTMLButtonElement) {
    this._Renderer2.setAttribute(elemeent, 'disabled', 'true');
    this._CartService.removveCartItem(id).subscribe({
      next: (response)=>{
        // console.log('Item removed:', response);
        this.cartItems = response;
        this._Renderer2.removeAttribute(elemeent, 'disabled');
      },
      error: (err) => {
        console.error('Error removing item:', err);
        this._Renderer2.removeAttribute(elemeent, 'disabled');
      }
    })
  }
}
