import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service.js';
import { Product } from '../../core/interfaces/product.js';
import { CartService } from '../../core/services/cart.service.js';
import { ToastrService } from 'ngx-toastr';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe.js';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, CuttextPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  constructor(
    private _WishlistService:WishlistService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2
  ) {}

  products: Product[] = [];
  wishlistData: string[] = [];

  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        // console.log('Wishlist items:', response);
        this.products = response.data;
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      }
    });
  }

  addToCart(productId: string | undefined, element: HTMLButtonElement): void {
    this._Renderer2.setProperty(element, 'disabled', true);
    this._CartService.addToCart(productId!).subscribe({
      next: (response) => {
        // console.log('Product added to cart:', response);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._ToastrService.success(response.message);
        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this._Renderer2.removeAttribute(element, 'disabled');
      }
    });
  }

  removeFromWishlist(productId: string | undefined): void {
    this._WishlistService.removeWishlistItem(productId).subscribe({
      next: (response) => {
        // console.log('Product removed from wishlist:', response);
        this.wishlistData = response.data;
        this.products = this.products.filter((item)=> this.wishlistData.includes(item._id!));
        // this.products = response.data;
        this._ToastrService.success(response.message);
        this._WishlistService.numOfWishlistItems.next(response.data.length);
      },
      error: (err) => {
        console.error('Error removing product from wishlist:', err);
      }
    });
  }
}
