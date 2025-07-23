import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [NgFor, CurrencyPipe, NgIf, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService, private  _Renderer2:Renderer2) { }

  cartItems: any = null;

  ngOnInit() {
    this._CartService.getCart().subscribe({
      next: (response) => {
        if(response.numOfCartItems >= 1){
          // console.log('Cart items:', response);
          this.cartItems = response;
        }
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
      }
    });
  }

  removeItem(id: string, elemeent: HTMLButtonElement) {
    this._Renderer2.setAttribute(elemeent, 'disabled', 'true');
    this._CartService.removeCartItem(id).subscribe({
      next: (response)=>{
        // console.log('Item removed:', response);
        this.cartItems = response;
        this._Renderer2.removeAttribute(elemeent, 'disabled');

        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },
      error: (err) => {
        console.error('Error removing item:', err);
        this._Renderer2.removeAttribute(elemeent, 'disabled');
      }
    })
  }

  updateQuantity(id: string, count: number, element1: HTMLButtonElement, element2: HTMLButtonElement) {
    if (count >= 1) {
      this._Renderer2.setAttribute(element1, 'disabled', 'true');
      this._Renderer2.setAttribute(element2, 'disabled', 'true');
      this._CartService.updateCartItemQuantity(id, count).subscribe({
        next: (response) => {
          // console.log('Quantity updated:', response);
          this.cartItems = response;
          this._Renderer2.removeAttribute(element1, 'disabled');
          this._Renderer2.removeAttribute(element2, 'disabled');
        },
        error: (err) => {
          console.error('Error updating quantity:', err);
          this._Renderer2.removeAttribute(element1, 'disabled');
          this._Renderer2.removeAttribute(element2, 'disabled');
        }
      });
    }
      
  }

  clearUserCart() {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        // console.log('Cart cleared:', response);
        if (response.message === 'success') {
          this.cartItems = null; // Clear the cart items from the view
          this._CartService.numOfCartItems.next(0); // Reset the number of cart items
        }
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
      }
    })
  }
}
