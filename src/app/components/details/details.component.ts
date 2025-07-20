import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service.js';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CartService } from '../../core/services/cart.service.js';
import { ToastrService } from 'ngx-toastr';

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
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2
  ) {}

  productId: string | null = '';
  productDetails: any = null;

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
  }

  addProduct(Id: string | null, element: HTMLButtonElement): void{
    this._Renderer2.setProperty(element, 'disabled', true);
    this._CartService.addToCart(Id!).subscribe({
      next: (response)=>{
        // console.log(response);
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this._Renderer2.removeAttribute(element, 'disabled');
      }
    })
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
