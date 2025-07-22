import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../../core/services/product.service.js';
import { CurrencyPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Product } from '../../core/interfaces/product.js';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe.js';
import { Category } from '../../core/interfaces/category.js';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, CurrencyPipe, CuttextPipe, SlicePipe, CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private _ProductService:ProductService, 
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2
  ) { }

  products: Product[] = [];
  categories: Category[] = [];
  
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
