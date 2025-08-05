import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CurrencyPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Product } from '../../core/interfaces/product';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe';
import { Category } from '../../core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe.js';
import { WishlistService } from '../../core/services/wishlist.service.js';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, CurrencyPipe, CuttextPipe, SlicePipe, CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private _ProductService:ProductService, 
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2
  ) { }

  term:string = '';
  products: Product[] = [];
  categories: Category[] = [];
  wishlistData: string[] = [];
  
  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        // console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this._ProductService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        //  console.log(this.categories);
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

  categoriesOptions: OwlOptions = {
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
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: false
  }

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    items: 1,
    nav: false
  }
}
