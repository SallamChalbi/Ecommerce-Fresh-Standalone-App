import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe.js';
import { CartService } from '../../core/services/cart.service.js';
import { ProductService } from '../../core/services/product.service.js';
import { WishlistService } from '../../core/services/wishlist.service.js';
import e from 'express';
import { Product } from '../../core/interfaces/product.js';

@Component({
  selector: 'app-products',
  imports: [RouterLink, CommonModule, CuttextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  constructor(
    private _ProductService:ProductService, 
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2
  ) { }

  products: Product[] = [];
  wishlistData: string[] = [];
  pageSize: number = 10; // Number of products per page
  page: number = 1; // Current page number
  total: number = 0; // Total number of products

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.page = response.metadata.currentPage;
        this.total = response.results;
        // console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        // console.log('Wishlist items:', response);
        this.wishlistData = response.data.map((item: any) => item._id);
        // this._WishlistService.numOfWishlistItems.next(response.data.length);
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      }
    });
  }

  addProduct(productId: string, element: HTMLButtonElement): void {
    this._Renderer2.setProperty(element, 'disabled', true);
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        // console.log('Product added to cart:', response);
        this._ToastrService.success(response.message)
        this._Renderer2.removeAttribute(element, 'disabled');

        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this._Renderer2.removeAttribute(element, 'disabled');
      }
    })
  }

  pageChanged(event: any): void {
    // console.log('Page changed to:', event);
    this._ProductService.getProducts(event).subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.page = response.metadata.currentPage;
        this.total = response.results;
        // console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addFav(productId: string | undefined): void{
    this._WishlistService.addToWishlist(productId).subscribe({
      next: (response) => {
        // console.log('Product added to wishlist:', response);
        this.wishlistData = response.data;
        this._ToastrService.success(response.message);
        this._WishlistService.numOfWishlistItems.next(response.data.length);
      },
      error: (err) => {
        console.error('Error adding product to wishlist:', err);
      }
    });
  }

  removeFav(productId: string | undefined): void {
    this._WishlistService.removeWishlistItem(productId).subscribe({
      next: (response) => {
        // console.log('Product removed from wishlist:', response);
        this.wishlistData = response.data;
        this._ToastrService.success(response.message);
        this._WishlistService.numOfWishlistItems.next(response.data.length);
      },
      error: (err) => {
        console.error('Error removing product from wishlist:', err);
      }
    });
  }
}
