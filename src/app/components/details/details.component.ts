import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service.js';

@Component({
  selector: 'app-details',
  imports: [CarouselModule, NgFor, NgIf, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, 
    private _ProductService:ProductService,
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2
  ) {}

  productId: string | null = '';
  productDetails: any = null;
  wishlistData: string[] = [];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      }
    })

    this._ProductService.getProductDetails(this.productId).subscribe({
      next: (response) => {
        // console.log('Product Details:', response.data);
        this.productDetails = response.data;
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

  addProduct(Id: string | null, element: HTMLButtonElement): void{
    this._Renderer2.setProperty(element, 'disabled', true);
    this._CartService.addToCart(Id!).subscribe({
      next: (response)=>{
        // console.log(response);
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');

        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this._Renderer2.removeAttribute(element, 'disabled');
      }
    })
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

  detailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    items: 1,
    nav: false
  }
}
